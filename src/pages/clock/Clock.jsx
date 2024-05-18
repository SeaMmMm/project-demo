import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Dial from './components/Dial'
import clockInfo from './data/description'

const Clock = () => {
  const date = { year: 2024, month: 4, day: 30 }

  return (
    <>
      <Header date={date} />
      <Wrapper>
        <Dial />
      </Wrapper>
      <Footer index={2} data={clockInfo} />
    </>
  )
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

export default Clock
