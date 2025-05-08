/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useToast } from "./use-toast";

function generateLyricList(lyric, toast) {
  const lines = lyric.split("\n");
  const result = [];

  lines.forEach((str) => {
    try {
      const parts = str.split("]");
      if (parts.length < 2) return;
      const time = parts[0].slice(1);
      result.push({ time, lyric: parts[1] });
    } catch (e) {
      toast({
        title: "Error parsing lyrics",
        description: `Invalid format: ${str}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  });

  return result;
}

function generateDom(group, currentIdx, lyricElement, activeScale) {
  return (
    <Wrapper ref={lyricElement}>
      {group.map(({ lyric }, idx) => (
        <Lyric $isActive={currentIdx === idx} $activeScale={activeScale} key={idx}>
          {lyric}
        </Lyric>
      ))}
    </Wrapper>
  );
}

function parseTime(timeStr) {
  var parts = timeStr.split(":");
  return +parts[0] * 60 + +parts[1];
}

function findIdx(audio, lyricsGroup) {
  const currentTime = audio.currentTime;

  for (let i = 0; i < lyricsGroup.length; i++) {
    const { time } = lyricsGroup[i];
    const timeInSeconds = parseTime(time);
    if (currentTime < timeInSeconds) {
      return i - 1;
    }
  }

  return lyricsGroup.length - 1;
}

const useLyricScrolling = (lyric, player, options = {}) => {
  const { toast } = useToast();
  const [currentIdx, setCurrentIdx] = useState(-1);
  const lyricElementWrapper = useRef(null);

  const { scrollBehavior = "smooth", scrollPosition = "center", activeScale = 1.2 } = options;
  const lyricsGroup = generateLyricList(lyric, toast);
  const dom = generateDom(lyricsGroup, currentIdx, lyricElementWrapper, activeScale);

  useEffect(() => {
    if (!player.current) return;

    const audio = player.current;
    const handleTimeUpdate = () => {
      const idx = findIdx(audio, lyricsGroup);
      if (idx !== currentIdx) {
        setCurrentIdx(idx);
      }
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentIdx, lyricsGroup, player]);

  useEffect(() => {
    if (currentIdx === -1 || !lyricElementWrapper.current) return;

    const lyricElement = lyricElementWrapper.current.children;
    const activeLyric = lyricElement[currentIdx || 0];
    activeLyric.scrollIntoView({
      behavior: scrollBehavior,
      block: scrollPosition,
      inline: "nearest",
    });
  }, [currentIdx, scrollBehavior, scrollPosition]);

  const jumpToLyric = (index) => {
    if (index >= 0 && index < lyricsGroup.length && player.current) {
      const timeInSeconds = parseTime(lyricsGroup[index].time);
      player.current.currentTime = timeInSeconds;
      setCurrentIdx(index);
    }
  };

  return { dom, currentIdx, lyricElementWrapper, lyricsGroup, jumpToLyric };
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  height: 420px;
  width: 100vw;
  overflow: hidden;
`;
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
`;

export default useLyricScrolling;
