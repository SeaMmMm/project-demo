import useLyricScrolling from "@/hooks/useLyricScrolling";
import { useRef, useState } from "react";
import styled from "styled-components";
import BottomControls from "./BottomControls";
import LyricsProvider from "./LyricsProvider";
import musicInfo from "./data";

const Lyrics = () => {
  const player = useRef(null);
  const [idx, setIdx] = useState(0);
  const [info, setInfo] = useState(musicInfo[idx]);
  const { dom, jumpToLyric, currentIdx } = useLyricScrolling(info.lyric, player);

  return (
    <Wrapper>
      <LyricsProvider value={{ info, setInfo, idx, setIdx }}>
        {dom}
        <BottomControls jumpToLyric={jumpToLyric} currentIdx={currentIdx} />
        <audio src={info.music} controls ref={player} />
      </LyricsProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 30px;
  justify-content: center;
  align-items: center;

  audio {
    width: 500px;
    height: 50px;
    background-color: #fff;
    border-radius: 10px;

    @media (max-width: 500px) {
      width: 90vw;
      border-radius: 5px;
      height: 40px;
      font-size: 12px;
      padding: 0 10px;
    }
  }
`;

export default Lyrics;
