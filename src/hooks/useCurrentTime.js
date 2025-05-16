import { useState } from 'react'

function useCurrentTime() {
  const [currentTime] = useState(() => {
    const date = new Date()
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }
  })

  return currentTime
}

export default useCurrentTime
