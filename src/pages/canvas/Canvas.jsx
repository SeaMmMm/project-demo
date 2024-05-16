import { useRef } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useDrawCanvas from '../../hooks/useDrawCanvas'
import useHrefTitle from '../../hooks/useHrefTitle'
import canvasInfo from './data/description'

const Canvas = () => {
  const title = useHrefTitle()
  const date = { year: 2024, month: 5, day: 15 }
  const canvasRef = useRef(null)
  const { size, handleMouseDown, handleMouseMove, handleMouseClear, reset } =
    useDrawCanvas(canvasRef)

  return (
    <>
      <Header title={title} date={date} />
      <Canva
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseClear}
        onMouseOut={handleMouseClear}
        width={size}
        height={size}
        $size={size}
      />
      <Reload onClick={reset}>⟲</Reload>
      <Footer index={8} data={canvasInfo} />
    </>
  )
}

const Canva = styled.canvas`
  position: absolute;
  border: 1px solid #000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Reload = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  background-color: #d1d5db;
  padding: 5px 8px;
`

export default Canvas
