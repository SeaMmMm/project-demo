import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useHrefTitle from '../../hooks/useHrefTitle'
import clockInfo from './data/description'
import Dial from './components/Dial'

const Clock = () => {
  const date = { year: 2024, month: 4, day: 30 }
  const title = useHrefTitle()

  return (
    <>
      <Wrapper>
        <Header title={title} date={date} />
        <Dial />
      </Wrapper>
      <Footer index={2} data={clockInfo} />
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 80px;
  height: 100vh;
`

export default Clock
