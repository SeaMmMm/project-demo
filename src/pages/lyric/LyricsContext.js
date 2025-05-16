import { createContext, useContext } from 'react'
import { useToast } from '@/hooks/use-toast'

const LyricsContext = createContext()

export function useLyricsContext() {
  const value = useContext(LyricsContext)
  const { toast } = useToast()

  if (!value) {
    toast({
      title: `Should be used in LyricsContext`,
      status: 'error',
      duration: 2000,
      isClosable: true,
    })
    return
  }

  return value
}

export default LyricsContext
