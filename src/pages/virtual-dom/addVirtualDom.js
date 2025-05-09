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
