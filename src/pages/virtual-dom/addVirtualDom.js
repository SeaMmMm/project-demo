export const NODE_NUMS_TO_APPEND = (start = 0, end = 1e7) => ({
  start: start,
  end: end,
  [Symbol.iterator]() {
    this.current = this.start;
    return this;
  },
  next() {
    if (this.current <= this.end) {
      return { value: this.current++, done: false };
    } else return { done: true };
  },
});

let virtualDom = new DocumentFragment(),
  batch = document.createDocumentFragment();

/**
 * 异步追加节点到虚拟DOM中（优化版）。
 *
 * 优化点：
 * 1. 根据 deadline.timeRemaining() 动态判断本次批次可以处理的数据量，避免长时间占用主线程；
 * 2. 批量拼接 HTML 字符串，减少多次调用 document.createElement 的开销；
 * 3. 使用 DocumentFragment 进行 DOM 更新，减少回流重排。
 *
 * @param {Iterator<number>} [iterator=NODE_NUMS_TO_APPEND()] - 节点迭代器。
 * @param {number} [batchSize=BATCH_SIZE] - 每批次处理的节点最大数量（如果空闲时间太低，可能会提前结束）。
 * @param {(vd:DocumentFragment) => void} [callback=(vd) => { console.info(`已经添加元素个数:${vd.childElementCount}`); }] - 追加完成后的回调函数。
 */
export function appendNodesAsync(
  iterator = NODE_NUMS_TO_APPEND(),
  batchSize = BATCH_SIZE,
  callback = (vd) => {
    console.info(`已经添加元素个数:${vd.childElementCount}`);
  },
  progressCallback = null // 新增进度回调参数
) {
  let result = iterator.next();
  let batch = document.createDocumentFragment();
  let virtualDom = document.createDocumentFragment();
  let totalProcessed = 0;

  function processBatch(deadline) {
    // 本次批次中构建 HTML 字符串
    let htmlBatch = "";
    let processedCount = 0;

    // 当还有节点、未超出指定批次数量，并且剩余空闲时间充足时，拼接节点 HTML
    // 注意：这里建议保留一些安全边际(例如 5ms)避免过度占用主线程
    while (!result.done && processedCount < batchSize && deadline.timeRemaining() > 5) {
      // 直接使用 innerHTML 拼接，若result.value为数字则相对安全
      htmlBatch += `<div>${result.value}</div>`;
      result = iterator.next();
      processedCount++;
      totalProcessed++;
    }

    if (htmlBatch) {
      // 利用临时容器将 HTML 字符串解析为 DOM 节点
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = htmlBatch;
      while (tempContainer.firstChild) {
        batch.appendChild(tempContainer.firstChild);
      }
      // 将当前批次的节点添加到虚拟 DOM 中
      virtualDom.appendChild(batch);
      // 重置 batch（注意这里重新声明 DocumentFragment 后 build 下一批次）
      batch = document.createDocumentFragment();

      // 如果提供了进度回调函数，则调用它
      if (typeof progressCallback === "function") {
        progressCallback(totalProcessed, iterator.end);
      }
    }

    if (!result.done) {
      // 若还有节点未处理，则再次安排空闲回调进行批处理
      requestIdleCallback(processBatch);
    } else {
      // 当所有节点处理完毕后，调用回调函数，并传入构建好的虚拟DOM
      callback(virtualDom);
      // 如有需要，可以在此处对 virtualDom 做后续处理，例如替换现有 DOM 部分
      virtualDom = document.createDocumentFragment();
    }
  }

  function startProcessing() {
    // 利用 requestAnimationFrame 确保在下一个动画帧中开启批量处理，
    // 避免首次调用时可能与其他同步任务冲突
    requestAnimationFrame(() => {
      requestIdleCallback(processBatch);
    });
  }

  startProcessing();
}

/**
 * 使用 Web Worker 异步追加节点，解决大量数据添加导致的性能问题
 *
 * 优化点：
 * 1. 将数据处理移至 Web Worker 线程，避免阻塞主线程
 * 2. 采用动态帧率控制，智能调整渲染速度
 * 3. 批次处理和渲染分离，确保 UI 响应性
 * 4. 利用 requestAnimationFrame 在合适的时机渲染
 *
 * @param {Iterator<number>} [iterator=NODE_NUMS_TO_APPEND()] - 节点迭代器
 * @param {number} [batchSize=BATCH_SIZE] - 每批次处理的节点数量
 * @param {(vd:DocumentFragment) => void} [callback] - 完成后的回调函数
 * @param {HTMLElement} [progressElement=null] - 可选的进度显示元素
 */
export function appendNodesWithWorker(
  iterator = NODE_NUMS_TO_APPEND(),
  batchSize = BATCH_SIZE,
  callback = (vd) => {
    console.info(`已经添加元素个数:${vd.childElementCount}`);
  },
  progressElement = null
) {
  // 创建虚拟 DOM 容器
  const virtualDom = document.createDocumentFragment();

  // 性能监控变量
  let frameRate = 60;
  let lastFrameTime = performance.now();
  let frameCount = 0;
  let totalProcessed = 0;
  let totalItems = 0;

  // 渲染状态管理
  let pendingBatches = [];
  let isRendering = false;
  let workerComplete = false;

  // 计算总数量（如果可能）
  try {
    if (typeof iterator.end === "number" && typeof iterator.start === "number") {
      totalItems = iterator.end - iterator.start;
    }
  } catch (e) {
    // 如果无法计算总数，保持默认值0
  }

  // 创建 Web Worker
  const workerBlob = new Blob(
    [
      `
    // Web Worker 内部代码
    self.onmessage = function(e) {
      if (e.data.type === 'process') {
        const { batchSize } = e.data;
        let iterator = e.data.iterator;
        let currentIndex = 0;
        let totalProcessed = 0;
        
        // 将迭代器数据转换为批次
        const processIterator = () => {
          // 创建批次
          let htmlBatch = "";
          let batchItemCount = 0;
          
          // 每个批次中处理最多 batchSize 个项目
          while (batchItemCount < batchSize && currentIndex < iterator.length) {
            const value = iterator[currentIndex++];
            htmlBatch += \`<div>\${value}</div>\`;
            batchItemCount++;
            totalProcessed++;
          }
          
          // 发送构建好的HTML批次给主线程
          if (htmlBatch.length > 0) {
            self.postMessage({
              type: 'batch',
              html: htmlBatch,
              progress: {
                processed: totalProcessed,
                total: iterator.length
              }
            });
          }
          
          // 如果还有数据待处理，安排下一个批次
          if (currentIndex < iterator.length) {
            setTimeout(processIterator, 0);
          } else {
            // 所有数据已处理完成
            self.postMessage({
              type: 'complete',
              processed: totalProcessed
            });
          }
        };
        
        processIterator();
      }
    };
  `,
    ],
    { type: "application/javascript" }
  );

  const workerUrl = URL.createObjectURL(workerBlob);
  const worker = new Worker(workerUrl);

  // 将迭代器转换为数组（这是必要的，因为我们无法直接传递迭代器到Worker）
  const iteratorArray = [];
  let iteratorItem = iterator.next();
  while (!iteratorItem.done) {
    iteratorArray.push(iteratorItem.value);
    iteratorItem = iterator.next();
  }

  // 更新进度显示函数
  const updateProgress = (processed, total) => {
    if (!progressElement) return;

    const percentage = total ? Math.floor((processed / total) * 100) : 0;
    progressElement.textContent = `处理进度: ${percentage}% (${processed}/${total || "未知"})`;

    // 如果有进度条样式，也可以更新进度条
    if (progressElement.style) {
      progressElement.style.width = `${percentage}%`;
    }
  };

  // 监听 Worker 消息
  worker.onmessage = (e) => {
    const data = e.data;

    if (data.type === "batch") {
      // 接收批次数据
      pendingBatches.push(data.html);

      // 更新进度
      if (data.progress) {
        totalProcessed = data.progress.processed;
        updateProgress(data.progress.processed, data.progress.total);
      }

      // 如果当前没有进行渲染，启动渲染流程
      if (!isRendering) {
        isRendering = true;
        requestAnimationFrame(renderNextFrame);
      }
    } else if (data.type === "complete") {
      // 标记 Worker 已完成所有处理
      workerComplete = true;
      URL.revokeObjectURL(workerUrl); // 释放 Blob URL
    }
  };

  // 发送数据到 Worker 开始处理
  worker.postMessage({
    type: "process",
    iterator: iteratorArray,
    batchSize: batchSize,
  });

  // 在动画帧中渲染批次
  function renderNextFrame(timestamp) {
    // 计算帧率
    frameCount++;
    if (timestamp - lastFrameTime >= 1000) {
      frameRate = frameCount;
      frameCount = 0;
      lastFrameTime = timestamp;
    }

    // 根据帧率动态调整一次渲染的批次数量
    // 高帧率表示渲染压力小，可以处理更多批次
    const batchesToProcess = frameRate >= 55 ? 3 : frameRate >= 45 ? 2 : 1;

    let processed = 0;

    // 处理等待的批次，但限制每帧处理的数量
    while (pendingBatches.length > 0 && processed < batchesToProcess) {
      const batchHtml = pendingBatches.shift();

      // 创建临时容器解析HTML
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = batchHtml;

      // 移动节点到虚拟DOM
      while (tempContainer.firstChild) {
        virtualDom.appendChild(tempContainer.firstChild);
      }

      processed++;
    }

    // 如果还有待处理的批次或Worker尚未完成，继续在下一帧渲染
    if (pendingBatches.length > 0 || (processed > 0 && !workerComplete)) {
      requestAnimationFrame(renderNextFrame);
    } else {
      isRendering = false;

      // 如果所有批次都已处理且Worker已完成，调用回调
      if (workerComplete && pendingBatches.length === 0) {
        worker.terminate(); // 终止Worker
        callback(virtualDom);
      }
    }
  }
}

/**
 * 同步追加节点到虚拟DOM中。
 *
 * @param {Iterable<number>} iterator - 一个包含数字的可迭代对象。
 * @param {(vd:DocumentFragment) => void} cb - 在所有节点追加完成后调用的回调函数，参数为虚拟DOM。
 */
export function appendNodesSync(iterator, cb) {
  for (const num of iterator) {
    const child = document.createElement("div");
    child.textContent = num;
    batch.appendChild(child);

    if (num % BATCH_SIZE === 0) {
      virtualDom.appendChild(batch);
      batch = document.createDocumentFragment();
    }
  }

  // 添加剩余的元素
  if (batch.childNodes.length > 0) {
    virtualDom.appendChild(batch);
  }

  cb(virtualDom);
  virtualDom = document.createDocumentFragment();
}

export const BATCH_SIZE = 1000;

/**
 * 创建虚拟滚动列表 - 只渲染可见部分的DOM节点
 * 适合展示大量数据但不需要一次性渲染所有节点的场景
 *
 * @param {number} totalItems - 总项目数
 * @param {string|HTMLElement} container - 容器选择器或DOM元素
 * @param {number} itemHeight - 每个项目的高度(px)
 * @param {Function} renderItem - 渲染项目的函数
 * @returns {Object} 虚拟列表控制对象
 */
export function createVirtualList(
  totalItems,
  container,
  itemHeight = 30,
  renderItem = (index) => `<div>项目 ${index}</div>`
) {
  const containerEl = typeof container === "string" ? document.querySelector(container) : container;

  if (!containerEl) throw new Error("容器元素未找到");

  // 设置容器样式
  containerEl.style.position = "relative";
  containerEl.style.overflow = "auto";

  // 创建滚动占位元素
  const scrollPlaceholder = document.createElement("div");
  scrollPlaceholder.style.height = `${totalItems * itemHeight}px`;
  scrollPlaceholder.style.width = "100%";
  scrollPlaceholder.style.position = "absolute";
  scrollPlaceholder.style.top = "0";
  scrollPlaceholder.style.left = "0";
  scrollPlaceholder.style.pointerEvents = "none";
  containerEl.appendChild(scrollPlaceholder);

  // 创建实际内容容器
  const listContent = document.createElement("div");
  listContent.style.position = "absolute";
  listContent.style.top = "0";
  listContent.style.left = "0";
  listContent.style.width = "100%";
  containerEl.appendChild(listContent);

  // 状态变量
  let visibleStartIndex = 0;
  let visibleEndIndex = 0;
  let visibleItems = Math.ceil(containerEl.clientHeight / itemHeight) + 2;

  // 渲染可见项目
  function renderVisibleItems() {
    const scrollTop = containerEl.scrollTop;
    visibleStartIndex = Math.floor(scrollTop / itemHeight);
    visibleEndIndex = Math.min(visibleStartIndex + visibleItems, totalItems - 1);

    // 设置内容容器位置
    listContent.style.transform = `translateY(${visibleStartIndex * itemHeight}px)`;

    // 生成可见项目的HTML
    const visibleContent = [];
    for (let i = visibleStartIndex; i <= visibleEndIndex; i++) {
      const itemContent = typeof renderItem === "function" ? renderItem(i) : `项目 ${i}`;
      visibleContent.push(
        `<div style="height:${itemHeight}px;box-sizing:border-box;">${itemContent}</div>`
      );
    }

    // 一次性更新DOM
    listContent.innerHTML = visibleContent.join("");
  }

  // 监听滚动事件
  containerEl.addEventListener("scroll", () => {
    const newVisibleStartIndex = Math.floor(containerEl.scrollTop / itemHeight);
    if (newVisibleStartIndex !== visibleStartIndex) {
      requestAnimationFrame(renderVisibleItems);
    }
  });

  // 监听容器大小变化
  const resizeObserver = new ResizeObserver(() => {
    visibleItems = Math.ceil(containerEl.clientHeight / itemHeight) + 2;
    renderVisibleItems();
  });
  resizeObserver.observe(containerEl);

  // 初始渲染
  renderVisibleItems();

  // 返回控制接口
  return {
    refresh: renderVisibleItems,
    scrollToIndex: (index) => {
      containerEl.scrollTop = index * itemHeight;
    },
    destroy: () => {
      resizeObserver.disconnect();
      containerEl.removeEventListener("scroll", renderVisibleItems);
    },
  };
}
