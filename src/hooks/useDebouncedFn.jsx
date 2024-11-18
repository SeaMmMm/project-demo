import { useCallback, useRef } from "react";

/**
 * 使用防抖函数的自定义钩子
 *
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 防抖延迟时间（毫秒）
 * @returns {Function} - 防抖后的函数
 */
const useDebouncedFn = (fn, delay) => {
  const timeout = useRef(null);

  return useCallback(
    (...args) => {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay]
  );
};

export default useDebouncedFn;
