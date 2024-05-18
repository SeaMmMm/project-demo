import { useEffect, useState } from 'react'
import drums from '../pages/drum/data/drums'

/**
 * 自定义 Hook：用于处理弹出键盘的逻辑
 *
 * @returns {{showNum: Number}} 返回一个包含 showNum 属性的对象
 */
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
