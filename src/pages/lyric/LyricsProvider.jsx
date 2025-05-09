import LyricsContext from "./LyricsContext";

const LyricsProvider = ({ value, children }) => (
  <LyricsContext.Provider value={value}>{children}</LyricsContext.Provider>
);

export default LyricsProvider;
