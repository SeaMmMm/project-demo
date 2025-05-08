import music from "@/assets/sounds/music.mp3";
import useLyricScrolling from "@/hooks/useLyricScrolling";
import { useRef } from "react";
import styled from "styled-components";
import lyric from "./data";

const Lyrics = () => {
  const player = useRef(null);
  const { dom } = useLyricScrolling(lyric, player);

  return (
    <Wrapper>
      <audio src={music} controls ref={player} />
      {dom}
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
  }
`;

export default Lyrics;
