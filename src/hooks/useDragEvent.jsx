import { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'

const useDragEvent = (ref, isRevert = false) => {
  const { width, height } = useWindowSize()
  const [endX, setEndX] = useState(0)
  const [endY, setEndY] = useState(0)

  useEffect(() => {
    const box = ref.current

    box.onmousedown = (e) => {
      const shiftX = e.clientX - box.getBoundingClientRect().left
      const shiftY = e.clientY - box.getBoundingClientRect().top

      box.style.left = e.pageX - shiftX + 'px'
      box.style.top = e.pageY - shiftY + 'px'

      const moveAt = (pageX, pageY) => {
        let endLeft, endTop

        if (isRevert) {
          endLeft = -(pageX - shiftX)
          endTop = -(pageY - shiftY)
        } else {
          endLeft = pageX - shiftX
          endTop = pageY - shiftY
        }

        if (endLeft <= 0) endLeft = 0
        else if (endLeft >= width - box.offsetWidth) endLeft = width - box.offsetWidth
        box.style.left = endLeft + 'px'

        if (endTop <= 0) endTop = 0
        else if (endTop >= height - box.offsetHeight) endTop = height - box.offsetHeight
        box.style.top = endTop + 'px'

        setEndX(endLeft)
        setEndY(endTop)
      }

      const onMouseMove = (e) => {
        moveAt(e.pageX, e.pageY)
      }

      document.addEventListener('mousemove', onMouseMove)

      box.onmouseup = () => {
        document.removeEventListener('mousemove', onMouseMove)
        box.onmouseup = null
      }
    }

    box.ondragstart = () => false
  }, [width, height, isRevert, ref])

  return { endX, endY }
}

export default useDragEvent
