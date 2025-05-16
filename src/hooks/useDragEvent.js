import { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'

/**
 * 在拖动事件中使用的自定义钩子。
 *
 * @param {React.RefObject} draggableElemRef - 要拖动的元素的引用。
 * @param {React.RefObject} [contentElemRef] - 内容元素的引用（可选）。
 * @returns {{endX: number, endY: number}} - 包含拖动结束位置的对象。
 */
function useDragEvent(draggableElemRef, contentElemRef = null) {
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const [endX, setEndX] = useState(0)
  const [endY, setEndY] = useState(0)

  useEffect(() => {
    const draggableElem = draggableElemRef.current
    let onPointerMove = null
    let onPointerUp = null

    const onPointerDown = (event) => {
      const shiftX = event.clientX - draggableElem.getBoundingClientRect().left
      const shiftY = event.clientY - draggableElem.getBoundingClientRect().top

      const updateElementPosition = (pageX, pageY) => {
        const calcLeft = Math.min(
          Math.max(pageX - shiftX, 0),
          windowWidth - draggableElem.offsetWidth,
        )
        const calcTop = Math.min(
          Math.max(pageY - shiftY, 0),
          windowHeight - draggableElem.offsetHeight,
        )

        draggableElem.style.left = `${calcLeft}px`
        draggableElem.style.top = `${calcTop}px`

        contentElemRef.current && (contentElemRef.current.style.left = `${-calcLeft}px`)
        contentElemRef.current && (contentElemRef.current.style.top = `${-calcTop}px`)

        setEndX(calcLeft)
        setEndY(calcTop)
      }

      onPointerMove = function (e) {
        updateElementPosition(e.pageX, e.pageY)
      }

      onPointerUp = function () {
        document.removeEventListener('pointermove', onPointerMove)
        document.removeEventListener('pointerup', onPointerUp)
      }

      document.addEventListener('pointermove', onPointerMove)
      document.addEventListener('pointerup', onPointerUp)
    }

    draggableElem.addEventListener('pointerdown', onPointerDown)
    draggableElem.ondragstart = () => false

    return () => {
      draggableElem.removeEventListener('pointerdown', onPointerDown)
      if (onPointerMove) {
        document.removeEventListener('pointermove', onPointerMove)
      }
      if (onPointerUp) {
        document.removeEventListener('pointerup', onPointerUp)
      }
    }
  }, [windowWidth, windowHeight, draggableElemRef, contentElemRef])

  useEffect(() => {
    const centerElement = () => {
      const startX = (windowWidth - draggableElemRef.current.offsetWidth) / 2
      const startY = (windowHeight - draggableElemRef.current.offsetHeight) / 2

      draggableElemRef.current.style.left = `${startX}px`
      draggableElemRef.current.style.top = `${startY}px`

      contentElemRef.current && (contentElemRef.current.style.left = `${-startX}px`)
      contentElemRef.current && (contentElemRef.current.style.top = `${-startY}px`)
    }
    centerElement()
  }, [draggableElemRef, contentElemRef, windowWidth, windowHeight])

  return { endX, endY }
}

export default useDragEvent
