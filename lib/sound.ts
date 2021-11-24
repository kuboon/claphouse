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
let context: AudioContext;
export function audioContext(
  { reconnect = false } = {},
): AudioContext | undefined {
  if (!IS_BROWSER) return;
  if (reconnect) {
    context.onstatechange = null
    context.close();
  }
  if (reconnect || !context) context = new AudioContext();
  return context;
}

let loadSoundsP: Promise<void>;
export function prepareSounds() {
  if (!loadSoundsP) {
    loadSoundsP = loadSounds();
  }
  return loadSoundsP;
}
const buffers = {} as Record<string, AudioBuffer>;
async function loadSounds() {
  if (!context) return;
  log("Loading sounds...");
  const files = Object.values(list).flatMap(({ files }) => files);
  const promises = files
    .map((n) =>
      fetch(`/sounds/${n}`)
        .then((r) => r.arrayBuffer())
        .then((x) => context!.decodeAudioData(x))
        .then((buf) => (buffers[n] = buf))
    );
  await Promise.all(promises).then(() => log("sounds loaded"));
}

function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
export function play(tag: string) {
  if (!context || context.state !== "running") return;
  const file = sample(list[tag].files);
  if (!buffers[file]) return;
  const gain = context.createGain();
  gain.connect(context.destination);
  gain.gain.value = Math.random() * 0.5 + 0.5;

  const source = context.createBufferSource();
  source.buffer = buffers[file];
  source.playbackRate.value = Math.random() + 0.5;

  source.connect(gain);
  source.start();
}
