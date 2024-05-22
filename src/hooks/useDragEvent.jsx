import { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'

/**
 * 在拖动事件中使用的自定义钩子。
 *
 * @param {React.RefObject} ref - 要拖动的元素的引用。
 * @param {React.RefObject} [contentRef=null] - 内容元素的引用（可选）。
 * @returns {{width: Number, height: Number}} - 包含拖动结束位置的对象。
 */
const useDragEvent = (ref, contentRef = null) => {
  const { width, height } = useWindowSize()
  const [endX, setEndX] = useState(0)
  const [endY, setEndY] = useState(0)

  useEffect(() => {
    const box = ref.current
    let movelistener, uplistener

    box.onmousedown = (e) => {
      const shiftX = e.clientX - box.getBoundingClientRect().left
      const shiftY = e.clientY - box.getBoundingClientRect().top

      box.style.left = e.pageX - shiftX + 'px'
      box.style.top = e.pageY - shiftY + 'px'

      const moveAt = (pageX, pageY) => {
        let endLeft, endTop

        endLeft = pageX - shiftX
        endTop = pageY - shiftY

        if (endLeft <= 0) endLeft = 0
        else if (endLeft >= width - box.offsetWidth) endLeft = width - box.offsetWidth
        box.style.left = endLeft + 'px'
        contentRef.current ? (contentRef.current.style.left = -endLeft + 'px') : null

        if (endTop <= 0) endTop = 0
        else if (endTop >= height - box.offsetHeight) endTop = height - box.offsetHeight
        box.style.top = endTop + 'px'
        contentRef.current ? (contentRef.current.style.top = -endTop + 'px') : null

        setEndX(endLeft)
        setEndY(endTop)
      }

      const onMouseMove = (e) => {
        moveAt(e.pageX, e.pageY)
      }

      movelistener = document.addEventListener('mousemove', onMouseMove)
      uplistener = document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove)
        box.onmouseup = null
      })
    }

    box.ondragstart = () => false

    return () => {
      document.removeEventListener('mousemove', movelistener)
      document.removeEventListener('mouseup', uplistener)
    }
  }, [width, height, ref, contentRef])

  useEffect(() => {
    const initialCenter = () => {
      ref.current.style.left = (width - ref.current.offsetWidth) / 2 + 'px'
      ref.current.style.top = (height - ref.current.offsetHeight) / 2 + 'px'
      contentRef.current
        ? (contentRef.current.style.left = -(width - ref.current.offsetWidth) / 2 + 'px')
        : null
      contentRef.current
        ? (contentRef.current.style.top = -(height - ref.current.offsetHeight) / 2 + 'px')
        : null
    }
    initialCenter()
  }, [ref, contentRef, width, height])

  return { endX, endY }
}

export default useDragEvent
