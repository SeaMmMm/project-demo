import { getAudioMap } from "@/pages/drum/audioLoader";
import drums from "@/pages/drum/drums";
import { useEffect, useState } from "react";

const usePopupKey = () => {
  const [showNum, setShowNum] = useState(-1);
  const audioMap = getAudioMap();

  const findDrum = (letter) => drums.find((drum) => drum.letter.toLowerCase() === letter);

  const playDrum = (drum) => {
    const audio = audioMap[drum.letter];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setShowNum(drum.index);
    setTimeout(() => setShowNum(-1), 100);
  };

  useEffect(() => {
    const popupKeyDown = (e) => {
      const drum = findDrum(e.key);
      if (drum) playDrum(drum);
    };
    document.addEventListener("keydown", popupKeyDown, false);
    return () => {
      document.removeEventListener("keydown", popupKeyDown, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { showNum, playDrum, findDrum };
};

export default usePopupKey;
