import { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'

const useDrawCanvas = (ref) => {
  const [size, setSize] = useState(600)
  const [isDrawing, setIsDrawing] = useState(false)
  const [startX, setStartX] = useState(null)
  const [startY, setStartY] = useState(null)

  const handleMouseDown = (e) => {
    setIsDrawing(true)
    setStartX(e.nativeEvent.offsetX)
    setStartY(e.nativeEvent.offsetY)
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return

    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = '#9ca3af'
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = 10

    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.stroke()
    setStartX(e.nativeEvent.offsetX)
    setStartY(e.nativeEvent.offsetY)
  }

  const handleMouseClear = () => {
    setIsDrawing(false)
  }

  const reset = () => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, size, size)
  }

  const { width } = useWindowSize()

  useEffect(() => {
    if (width < 600) {
      setSize(300)
    } else {
      setSize(600)
    }
  }, [width])

  return {
    size,
    reset,
    isDrawing,
    startX,
    startY,
    handleMouseDown,
    handleMouseMove,
    handleMouseClear,
  }
}

export default useDrawCanvas
