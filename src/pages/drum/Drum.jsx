import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import useHrefTitle from '../../hooks/useHrefTitle'
import DrumButton from './components/DrumButton'
import drums from './data/drums'

const Drum = () => {
  const date = { year: 2024, month: 4, day: 29 }
  const title = useHrefTitle()
  const [showNum, setShowNum] = useState(-1)

  const findDrum = (letter) => drums.find((drum) => drum.letter.toLowerCase() === letter)
  const playDrum = (drum) => {
    const audio = new Audio(drum.audio)
    audio.play()
  }

  const popupKeyDown = (e) => {
    const { key } = e
    const drum = findDrum(key)

    if (drum) {
      playDrum(drum)
      setShowNum(drum.index)
      setTimeout(() => setShowNum(-1), 100)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', popupKeyDown, false)

    return () => {
      document.removeEventListener('keydown', popupKeyDown, false)
    }
  })

  return (
    <Wrapper>
      <Header title={title} date={date} />
      {drums.map((drum, idx) => (
        <DrumButton
          key={idx}
          index={idx}
          showNum={showNum}
          letter={drum.letter}
          description={drum.description}
        />
      ))}
      <Footer index={1} />
    </Wrapper>
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

export default Drum
