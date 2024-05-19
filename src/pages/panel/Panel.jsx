import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useWindowSize from '../../hooks/useWindowSize'
import Card from './components/Card'
import cardsInfo from './data/cards'
import description from './data/description'

const Panel = () => {
  const date = { year: 2024, month: 5, day: 8 }
  const { height } = useWindowSize()

  return (
    <>
      <Header date={date} />
      <Wrapper $height={height}>
        {cardsInfo.map((info, index) => (
          <Card key={index} info={info} />
        ))}
      </Wrapper>
      <Footer index={6} data={description} />
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: ${(props) => `calc(${props.$height}px - 80px)`};
  padding: 20px;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    height: ${(props) => `calc(${props.$height}px - 60px)`};
  }
`

export default Panel
