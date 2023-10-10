let audioContext: AudioContext;

if (typeof window !== "undefined") {
  audioContext = new AudioContext();
}

export async function loadSound(url: string): Promise<AudioBuffer> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

export function playSound(audioBuffer: AudioBuffer): void {
  const gainNode = audioContext.createGain();
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(gainNode).connect(audioContext.destination);
  source.start(0);
}

export async function PlaySendSound(volume: number): Promise<void> {
  const gainNode = audioContext.createGain();
  const audioBuffer = await loadSound("/sounds/send.mp3");
  gainNode.gain.value = volume;
  playSound(audioBuffer);
}

export async function PlayReceiveSound(volume: number): Promise<void> {
  const gainNode = audioContext.createGain();
  const audioBuffer = await loadSound("/sounds/receive.mp3");
  gainNode.gain.value = volume;
  playSound(audioBuffer);
}
