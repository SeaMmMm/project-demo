import { useEffect } from "react";

/**
 * 在组件外部点击时触发回调函数的自定义 Hook。
 *
 * @param {React.RefObject} ref - 组件的引用对象。
 * @param {Function} handler - 点击外部时要执行的回调函数。
 */
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target) || event.button !== 0) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
