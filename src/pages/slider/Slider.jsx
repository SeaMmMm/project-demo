import { useState } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import RangeSlider from './components/RangeSlider'
import description from './data/description'

const Slider = () => {
  const date = { year: 2024, month: 5, day: 4 }
  const [value, setValue] = useState(0)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      <Header date={date} />
      <Wrapper>
        <RangeSlider
          value={value}
          max={200}
          callback={handleChange}
          width={400}
          size='medium'
        />
        <p>value: {value}</p>
      </Wrapper>
      <Footer index={3} data={description} />
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
  justify-items: center;
  align-content: center;
  gap: 30px;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    gap: 20px;
  }
`

export default Slider
