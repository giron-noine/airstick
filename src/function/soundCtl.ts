import { Howl } from "howler";

const hihat = new Howl({
  src: ["/sounds/hihat.mp3"],
});
const snare = new Howl({
  src: ["/sounds/snare.mp3"],
});
const crash = new Howl({
  src: ["/sounds/crash.mp3"],
});
const hone = new Howl({
  src: ["/sounds/hone.mp3"],
});

const testSound = new Howl({
  src: ["/sounds/send.mp3"],
});

const loopA = new Howl({
  src: ["/sounds/loopA.mp3"],
  loop: true,
});
const loopB = new Howl({
  src: ["/sounds/loopB.mp3"],
  loop: true,
});

export const PlayTestSound = () => {
  testSound.play();
};

export const PlayHihatSound = () => {
  hihat.play();
};

export const PlaySnareSound = () => {
  snare.play();
};

export const PlayCrashSound = () => {
  crash.play();
};

export const PlayHoneSound = () => {
  hone.play();
};

export const LoopASound = () => {
  loopA.play();
};

export const StopLoopA = () => {
  loopA.stop();
};

export const LoopBSound = () => {
  loopB.play();
};

export const StopLoopB = () => {
  loopB.stop();
};
