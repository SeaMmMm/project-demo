import useLyricScrolling from "@/hooks/useLyricScrolling";
import { useRef, useState } from "react";
import styled from "styled-components";
import BottomControls from "./BottomControls";
import LyricsContext from "./LyricsContext";
import musicInfo from "./data";

const Lyrics = () => {
  const player = useRef(null);
  const [info, setInfo] = useState(musicInfo[0]);
  const { dom, jumpToLyric, currentIdx } = useLyricScrolling(info.lyric, player);

  return (
    <Wrapper>
      <LyricsContext value={{ info, setInfo }}>
        {dom}
        <BottomControls jumpToLyric={jumpToLyric} currentIdx={currentIdx} />
        <audio src={info.music} controls ref={player} />
      </LyricsContext>
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
