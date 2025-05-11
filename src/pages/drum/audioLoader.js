import drums from "./drums";

const audioMap = {};
let audioPromise;
let audioLoaded = false;

export function loadAllAudios() {
  if (audioLoaded) return;

  if (!audioPromise) {
    audioPromise = Promise.all(
      drums.map(
        (drum) =>
          new Promise((resolve) => {
            const audio = new Audio(drum.audio);
            audio.preload = "auto";
            audio.addEventListener("canplaythrough", resolve, { once: true });
            audioMap[drum.letter] = audio;
          })
      )
    ).then(() => {
      audioLoaded = true;
    });
  }
  throw audioPromise;
}

export function getAudioMap() {
  return audioMap;
}
