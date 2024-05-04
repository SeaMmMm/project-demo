import { useEffect, useState } from 'react'
import drums from '../pages/drum/data/drums'

const usePopupKey = () => {
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

  return { showNum }
}

export default usePopupKey
