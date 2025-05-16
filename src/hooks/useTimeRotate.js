import { useEffect, useState } from 'react'

/**
 * 用于获取当前时间并计算时钟旋转角度
 *
 * @returns {{timeRotate: number, shouldTransition: boolean}} 返回包含时间旋转角度和过渡状态的对象
 */
function useTimeRotate() {
  const getTime = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return { hours, minutes, seconds }
  }

  const getTimesRotate = (time) => {
    const { hours, minutes, seconds } = time

    const secondRotate = seconds * 6
    const minuteRotate = minutes * 6 + seconds * 0.1
    const hourRotate = 30 * hours + minutes * 0.5

    return { hourRotate, minuteRotate, secondRotate }
  }

  const [timeRotate, setTimeRotate] = useState(() => getTimesRotate(getTime()))
  const [shouldTransition, setShouldTransition] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTime()

      if (time.seconds === 0) {
        setShouldTransition(false)
      }
      else {
        setShouldTransition(true)
      }

      const timeRotate = getTimesRotate(time)
      setTimeRotate(timeRotate)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return { timeRotate, shouldTransition, getTime }
}

export default useTimeRotate
