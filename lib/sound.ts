import { log } from "../components/Log.tsx";
import { IS_BROWSER } from "../deps.ts";

export const list: Record<string, { button: string; files: string[] }> = {
  clap: {
    button: "👏",
    files: [
      "clap0.m4a",
      "clap1.m4a",
      "clap2.m4a",
      "clap3.m4a",
    ],
  },
};
const buffers = {} as Record<string, AudioBuffer>;
export const context = IS_BROWSER ? new AudioContext() : undefined;

export function prepareSounds() {
  if (!loadSoundsP) {
    loadSoundsP = loadSounds();
  }
  return loadSoundsP;
}
let loadSoundsP: Promise<void>;
async function loadSounds() {
  if (!context) return;
  log("Loading sounds...");
  const files = Object.values(list).flatMap(({ files }) => files);
  const promises = files
    .map((n) =>
      fetch(`/sounds/${n}`)
        .then((r) => r.arrayBuffer())
        .then((x) => context.decodeAudioData(x))
        .then((buf) => (buffers[n] = buf))
    );
  await Promise.all(promises).then(() => log("sounds loaded"));
}

function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
export function play(tag: string) {
  if (!context) return;
  const file = sample(list[tag].files);
  const source = context.createBufferSource();
  source.buffer = buffers[file];
  source.connect(context.destination);
  source.start();
}
