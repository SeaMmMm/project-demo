import { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

/**
 * 在拖动事件中使用的自定义钩子。
 *
 * @param {React.RefObject} draggableElemRef - 要拖动的元素的引用。
 * @param {React.RefObject} [contentElemRef=null] - 内容元素的引用（可选）。
 * @returns {{endX: Number, endY: Number}} - 包含拖动结束位置的对象。
 */
const useDragEvent = (draggableElemRef, contentElemRef = null) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);

  useEffect(() => {
    const draggableElem = draggableElemRef.current;
    let moveListener, upListener;

    const onMouseDown = (event) => {
      const shiftX = event.clientX - draggableElem.getBoundingClientRect().left;
      const shiftY = event.clientY - draggableElem.getBoundingClientRect().top;

      const updateElementPosition = (pageX, pageY) => {
        const calcLeft = Math.min(
          Math.max(pageX - shiftX, 0),
          windowWidth - draggableElem.offsetWidth
        );
        const calcTop = Math.min(
          Math.max(pageY - shiftY, 0),
          windowHeight - draggableElem.offsetHeight
        );

        draggableElem.style.left = `${calcLeft}px`;
        draggableElem.style.top = `${calcTop}px`;

        contentElemRef.current && (contentElemRef.current.style.left = `${-calcLeft}px`);
        contentElemRef.current && (contentElemRef.current.style.top = `${-calcTop}px`);

        setEndX(calcLeft);
        setEndY(calcTop);
      };

      const onMouseMove = (e) => updateElementPosition(e.pageX, e.pageY);

      moveListener = document.addEventListener("mousemove", onMouseMove);
      upListener = document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", upListener);
      });
    };

    draggableElem.addEventListener("mousedown", onMouseDown);
    draggableElem.ondragstart = () => false;

    return () => {
      draggableElem.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", moveListener);
      document.removeEventListener("mouseup", upListener);
    };
  }, [windowWidth, windowHeight, draggableElemRef, contentElemRef]);

  useEffect(() => {
    const centerElement = () => {
      const startX = (windowWidth - draggableElemRef.current.offsetWidth) / 2;
      const startY = (windowHeight - draggableElemRef.current.offsetHeight) / 2;

      draggableElemRef.current.style.left = `${startX}px`;
      draggableElemRef.current.style.top = `${startY}px`;

      contentElemRef.current && (contentElemRef.current.style.left = `${-startX}px`);
      contentElemRef.current && (contentElemRef.current.style.top = `${-startY}px`);
    };
    centerElement();
  }, [draggableElemRef, contentElemRef, windowWidth, windowHeight]);

  return { endX, endY };
};

export default useDragEvent;
