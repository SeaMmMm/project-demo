export const NODE_NUMS_TO_APPEND = ((start = 0, end = 1e7) => ({
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
}))();

let virtualDom = new DocumentFragment(),
  batch = document.createDocumentFragment();

/**
 * 异步追加节点到虚拟DOM中。
 *
 * @param {Iterator<number>} [iterator=NODE_NUMS_TO_APPEND] - 节点迭代器。
 * @param {number} [batchSize=BATCH_SIZE] - 每批次追加的节点数量。
 * @param {(vd:DocumentFragment) => void} [callback=(vd) => { console.info(`已经添加元素个数:${vd.childElementCount}`); }] - 追加完成后的回调函数。
 */
export function appendNodesAsync(
  iterator = NODE_NUMS_TO_APPEND,
  batchSize = BATCH_SIZE,
  callback = (vd) => {
    // eslint-disable-next-line no-console
    console.info(`已经添加元素个数:${vd.childElementCount}`);
  }
) {
  let result = iterator.next();
  let count = 0;

  function processBatch() {
    while (!result.done && count < batchSize) {
      const child = document.createElement("div");
      child.textContent = result.value;
      batch.appendChild(child);
      result = iterator.next();
      count++;
    }

    virtualDom.appendChild(batch);
    batch = document.createDocumentFragment();
    count = 0;

    if (!result.done) {
      setTimeout(processBatch, 0);
    } else {
      callback(virtualDom);
      virtualDom = new DocumentFragment();
    }
  }

  processBatch();
}

/**
 * 同步追加节点到虚拟DOM中。
 *
 * @param {(vd:DocumentFragment) => void} cb - 回调函数，接受虚拟DOM作为参数。
 */
export function appendNodesSync(cb) {
  for (const num of NODE_NUMS_TO_APPEND) {
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
  virtualDom = new DocumentFragment();
}

export const BATCH_SIZE = 1000;
