import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useDragEvent from '../../hooks/useDragEvent'
import useWindowSize from '../../hooks/useWindowSize'
import scopeInfo from './data/description'
import txt from './data/txt'

const Scope = () => {
  const date = { year: 2024, month: 5, day: 19 }
  const { width, height } = useWindowSize()
  const boxRef = useRef(null)
  const txtRef = useRef(null)
  useDragEvent(boxRef, txtRef)

  return (
    <>
      <Header date={date} isFixed={true} />
      {!isMobile && (
        <Box ref={boxRef}>
          <Text $width={width} $height={height} ref={txtRef}>
            {txt}
          </Text>
        </Box>
      )}
      {isMobile && <Error>Please view on your computer</Error>}
      <Footer index={10} data={scopeInfo} />
    </>
  )
}

const Box = styled.div`
  position: fixed;
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  overflow: hidden;
  background: white;
`

const Error = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Input', sans-serif;
  font-size: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    display: none;
  }
`

const Text = styled.div`
  position: absolute;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  font-family: 'Input', sans-serif;
  line-height: 1.5;
  font-size: 1.2rem;
  padding: 2.5rem 2rem;
  text-align: justify;
  overflow-y: hidden;
`

export default Scope
