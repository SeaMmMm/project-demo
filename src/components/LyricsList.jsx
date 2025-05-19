import styled, { css } from 'styled-components'

function LyricsList(group, currentIdx, lyricElement, activeScale) {
  return (
    <Wrapper ref={lyricElement}>
      {group.map(({ lyric, time }, idx) => (
        <Lyric $isActive={currentIdx === idx} $activeScale={activeScale} key={`${lyric}-${time}`}>
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
    overflow: scroll;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px 0;
    margin: 0 auto;
  }
`

const Lyric = styled.div`
  font-size: 20px;
  text-align: center;
  color: #888888;
  padding: 10px 16px;
  max-width: 85vw;
  word-break: break-word;
  overflow-wrap: break-word;
  position: relative;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
  perspective: 800px;

  ${({ $isActive, $activeScale }) =>
    $isActive
      ? css`
        transform: scale(${$activeScale}) translateY(-4px) translateZ(20px); 
        font-weight: bolder;
        color: #000000; // 高亮时为黑色
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
        
        &::before {
          width: 40%;
          opacity: 1;
          height: 2px;
        }
        
        &::after {
          width: 25%;
          opacity: 0.8;
          height: 1px;
        }
      `
      : css`
        transform: scale(1) translateZ(0px);
        opacity: 0.7;
        filter: blur(0.4px);
        letter-spacing: 0px;
      `}

  @media (max-width: 500px) {
    font-size: 16px;
    max-width: 80vw;
    padding: 8px;
    margin: 0 10px;
    text-align: center;
  }
`
