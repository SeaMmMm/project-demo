export const NODE_NUMS_TO_APPEND = (start = 0, end = 1e7) => ({
  start: start,
  end: end,
  [Symbol.iterator]() {
    this.current = this.start;
    return this;
  },
  next() {
    if (this.current < this.end) {
      this.current += 1;
      return { value: this.current, done: false };
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
    // eslint-disable-next-line no-console
    console.info(`已经添加元素个数:${vd.childElementCount}`);
  }
) {
  let result = iterator.next();
  let batch = document.createDocumentFragment();
  let virtualDom = document.createDocumentFragment();

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
