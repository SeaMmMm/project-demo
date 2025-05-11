import Cyberpunk from "./assets/i-really-want-to-stay-at-your-house.aac";
import CyberpunkLyric from "./assets/i-really-want-to-stay-at-your-house.js";
import jumpingMachineLyric from "./assets/jumping-machine.js";
import jumpingMachine from "./assets/jumping-machine.mp3";
import rainbowLyric from "./assets/rainbow.js";
import rainbow from "./assets/rainbow.mp3";
import whatWasThatLyric from "./assets/what-was-that.js";
import whatWasThat from "./assets/what-was-that.mp3";

const musicList = [
  {
    name: "跳楼机",
    music: jumpingMachine,
    lyric: jumpingMachineLyric,
  },
  {
    name: "What was that",
    music: whatWasThat,
    lyric: whatWasThatLyric,
  },
  {
    name: "I Really Want to Stay at Your House",
    music: Cyberpunk,
    lyric: CyberpunkLyric,
  },
  {
    name: "彩虹",
    music: rainbow,
    lyric: rainbowLyric,
  },
];
export default musicList;
