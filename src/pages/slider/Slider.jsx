import { useState } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useHrefTitle from '../../hooks/useHrefTitle'
import RangeSlider from './components/RangeSlicer'
import description from './data/description'

const Slider = () => {
  const date = { year: 2024, month: 5, day: 4 }
  const title = useHrefTitle()
  const [value, setValue] = useState(0)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      <Header date={date} title={title} />
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
  display: grid;
  height: 100vh;
  justify-items: center;
  align-content: center;
  gap: 30px;
`

export default Slider
