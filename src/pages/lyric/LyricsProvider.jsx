import LyricsContext from './LyricsContext'

function LyricsProvider({ value, children }) {
  return <LyricsContext.Provider value={value}>{children}</LyricsContext.Provider>
}

export default LyricsProvider
