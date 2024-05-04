import { useState } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useHrefTitle from '../../hooks/useHrefTitle'
import RangeSlicer from '../slider/components/RangeSlider'
import frameInfo from './data/description'

const Frame = () => {
  const title = useHrefTitle()
  const date = { year: 2024, month: 5, day: 5 }
  const [spacing, setSpacing] = useState(0)
  const [blur, setBlur] = useState(0)
  const [color, setColor] = useState('#000000')

  const debounce = (fn, delay) => {
    let timer = null

    return function () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  }

  const debouncedColorChange = debounce(setColor, 100)
  const handleColorChange = (e) => {
    debouncedColorChange(e.target.value)
  }

  return (
    <>
      <Header title={title} date={date} />
      <Wrapper $color={color} $spacing={spacing} $blur={blur}>
        <p>
          Update CSS Variables with <span>JS</span>
        </p>
        <Content>
          <Div>
            Spacing:
            <RangeSlicer
              value={spacing}
              width={100}
              size='small'
              max={80}
              callback={(e) => {
                setSpacing(e.target.value)
              }}
            />
          </Div>
          <Div>
            Blur:
            <RangeSlicer
              value={blur}
              width={100}
              size='small'
              max={20}
              callback={(e) => {
                setBlur(e.target.value)
              }}
            />
          </Div>
          Base color:
          {/* 确认后再修改颜色 */}
          <input type='color' value={color} onChange={handleColorChange} />
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
  display: grid;
  height: 100vh;
  align-content: center;
  justify-items: center;
  gap: 30px;
  padding: 0 300px;

  span {
    color: ${({ $color }) => $color};
  }

  img {
    width: 500px;
    border: ${({ $spacing }) => $spacing}px solid ${({ $color }) => $color};
    filter: blur(${({ $blur }) => $blur}px);
  }
`

const Content = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  z-index: 10;
`

const Div = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  span {
    color: var(--main-color);
  }
`

export default Frame
