import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useHrefTitle from '../../hooks/useHrefTitle'
import Dial from './components/Dial'
import clockInfo from './data/description'

const Clock = () => {
  const date = { year: 2024, month: 4, day: 30 }
  const title = useHrefTitle()

  return (
    <>
      <Header title={title} date={date} />
      <Wrapper>
        <Dial />
      </Wrapper>
      <Footer index={2} data={clockInfo} />
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 80px;
  height: 100vh;
`

export default Clock
