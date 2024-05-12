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
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, auto);
    row-gap: 10px;
    justify-items: center;
    align-items: center;
    justify-content: space-around;
    align-content: center;
  }
`

export default Drum
