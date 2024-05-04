import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useHrefTitle from '../../hooks/useHrefTitle'
import usePopupKey from '../../hooks/usePopupKey'
import useDrumInfo from '../../store/drum'
import DrumButton from './components/DrumButton'
import drums from './data/drums'

const Drum = () => {
  const date = { year: 2024, month: 4, day: 29 }
  const title = useHrefTitle()
  const drumsInfo = useDrumInfo((state) => state.description)
  const { showNum } = usePopupKey()

  return (
    <>
      <Header title={title} date={date} />
      <Wrapper>
        {drums.map((drum, idx) => (
          <DrumButton
            key={idx}
            index={idx}
            showNum={showNum}
            letter={drum.letter}
            description={drum.description}
          />
        ))}
      </Wrapper>
      <Footer index={1} data={drumsInfo} />
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

export default Drum
