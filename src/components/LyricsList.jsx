import styled from 'styled-components'

function LyricsList(group, currentIdx, lyricElement, activeScale) {
  return (
    <Wrapper ref={lyricElement}>
      {group.map(({ lyric }, idx) => (
        <Lyric $isActive={currentIdx === idx} $activeScale={activeScale} key={crypto.randomUUID()}>
          {lyric}
        </Lyric>
      ))}
    </Wrapper>
  )
}

export default LyricsList

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  height: 420px;
  width: 100vw;
  overflow: scroll;

  @media (max-width: 500px) {
    height: 300px;
    width: 80vw;
    overflow: scroll;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px 0;
    margin: 0 auto;
  }
`
const Lyric = styled.div`
  transition: all 0.3s ease-in-out;
  font-size: 20px;
  text-align: center;
  line-height: 1.5;
  color: #d1d5db;
  ${({ $isActive, $activeScale }) =>
    $isActive
      ? `transform: scale(${$activeScale}); font-weight: bold; color: black`
      : `transform: scale(1); opacity: 0.9`};

  @media (max-width: 500px) {
    font-size: 16px;
    line-height: 1.2;
    color: #d1d5db;
    ${({ $isActive }) =>
      $isActive
        ? `transform: scale(1.1); font-weight: bold; color: black`
        : `transform: scale(1); opacity: 0.9`};
    margin: 0 10px;
    padding: 0 10px;
    text-align: center;
  }
`
