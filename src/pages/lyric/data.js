import jumpingMachineLyric from "./assets/jumping-machine.js";
import jumpingMachineMusic from "./assets/jumping-machine.mp3";
import hardToReciteScriptureLyric from "./assets/hard-to-recite-scripture.js";
import hardToReciteScriptureMusic from "./assets/hard-to-recite-scripture.mp3";
import whatWasThatLyric from "./assets/what-was-that.js";
import whatWasThatMusic from "./assets/what-was-that.mp3";

const musicList = [
  {
    name: "难念的经",
    music: hardToReciteScriptureMusic,
    lyric: hardToReciteScriptureLyric,
  },
  { name: "跳楼机", music: jumpingMachineMusic, lyric: jumpingMachineLyric },
  {
    name: "What was that",
    music: whatWasThatMusic,
    lyric: whatWasThatLyric,
  },
];
export default musicList;
