import { useEffect, useState } from 'react'

const useTimeRotate = () => {
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

  const [timeRotate, setTimeRotate] = useState(getTimesRotate(getTime()))

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTime()
      const timeRotate = getTimesRotate(time)

      setTimeRotate(timeRotate)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return timeRotate
}

export default useTimeRotate
