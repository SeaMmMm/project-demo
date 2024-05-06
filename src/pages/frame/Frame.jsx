import { useState } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useDebouncedFn from '../../hooks/useDebouncedFn'
import useHrefTitle from '../../hooks/useHrefTitle'
import Controler from './components/Controler'
import frameInfo from './data/description'

const Frame = () => {
  const title = useHrefTitle()
  const date = { year: 2024, month: 5, day: 5 }
  const [spacing, setSpacing] = useState(0)
  const [blur, setBlur] = useState(0)
  const [color, setColor] = useState('#000000')
  const debouncedSetColor = useDebouncedFn(setColor, 100)

  const handleColorChange = (e) => {
    debouncedSetColor(e.target.value)
  }

  return (
    <>
      <Header title={title} date={date} />
      <Wrapper $color={color} $spacing={spacing} $blur={blur}>
        <p>
          Update CSS Variables with <span>JS</span>
        </p>
        <Content>
          <Controler
            label='Spacing:'
            value={spacing}
            callback={(e) => {
              setSpacing(e.target.value)
            }}
          />
          <Controler
            label='Blur:'
            value={blur}
            callback={(e) => {
              setBlur(e.target.value)
            }}
          />
          Base color: <input type='color' value={color} onChange={handleColorChange} />
        </Content>
        <img
          src='https://opendoodles.s3-us-west-1.amazonaws.com/running.svg'
          alt='woman-run'
        />
      </Wrapper>
      <Footer index={4} data={frameInfo} />
    </>
  )
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: grid;
  align-content: center;
  justify-items: center;
  gap: 30px;

  span {
    color: ${({ $color }) => $color};
  }

  img {
    width: 500px;
    border: ${({ $spacing }) => $spacing}px solid ${({ $color }) => $color};
    filter: blur(${({ $blur }) => $blur}px);
    pointer-events: none;
  }
`

const Content = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`

export default Frame
