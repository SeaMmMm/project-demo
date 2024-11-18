import drums from "@/pages/drum/drums";
import { useEffect, useRef, useState } from "react";

/**
 * 用于处理弹出键盘的逻辑(drum组件)
 *
 * @returns {{showNum: Number}} 返回一个包含 showNum 属性的对象
 */
const usePopupKey = () => {
  const [showNum, setShowNum] = useState(-1);
  const audioMap = useRef({}); // 用于存储所有预加载的音频对象

  const findDrum = (letter) => drums.find((drum) => drum.letter.toLowerCase() === letter);

  const playDrum = (drum) => {
    const audio = audioMap.current[drum.letter];
    if (audio) {
      audio.currentTime = 0; // 重置播放时间到起点
      audio.play();
    }
  };

  useEffect(() => {
    const popupKeyDown = (e) => {
      const { key } = e;
      const drum = findDrum(key);

      if (drum) {
        playDrum(drum);
        setShowNum(drum.index);
        setTimeout(() => setShowNum(-1), 100);
      }
    };
    // 预加载所有音频文件
    drums.forEach((drum) => {
      const audio = new Audio(drum.audio);
      audio.preload = "auto"; // 确保音频文件自动预加载
      audioMap.current[drum.letter] = audio;
    });

    document.addEventListener("keydown", popupKeyDown, false);

    return () => {
      document.removeEventListener("keydown", popupKeyDown, false);
    };
  }, []);

  return { showNum };
};

export default usePopupKey;
