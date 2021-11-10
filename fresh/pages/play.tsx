/** @jsx h */
/** @jsxFrag Fragment */
import {
  Fragment,
  h,
  Head,
  IS_BROWSER,
  PageConfig,
  useCallback,
  useEffect,
  useState,
} from "../deps.ts";

export const config: PageConfig = { runtimeJS: true };

const list = {
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
const buffers = {} as Record<string, AudioBuffer>;
function loadSounds() {
  context = new AudioContext();
  const files = Object.values(list).flatMap(({ files }) => files);
  const promises = files
    .map((n) =>
      fetch(`/sounds/${n}`)
        .then((r) => r.arrayBuffer())
        .then((x) => context.decodeAudioData(x))
        .then((buf) => (buffers[n] = buf))
        .catch((e) => {
          print(e);
          print(JSON.stringify(e));
        })
    );
  return Promise.all(promises).then(() => print("音源ロード完了"));
}

function SoundToggle() {
  const [isOn, setIsOn] = useState(false);
  useEffect(() => {
    loadSounds();
  }, []);
  const onClick = useCallback(async () => {
    if (!context) await loadSounds();
    const newVal = !isOn;
    if (newVal) {
      context.resume();
    } else {
      context.suspend();
      setIsOn(newVal);
    }
    setIsOn(newVal);
  }, [isOn]);
  const className = isOn ? "switch on" : "switch";
  return (
    <div>
      <div className={className} onClick={onClick}></div>🔈
    </div>
  );
}

function print(msg: string) {
  console.log(msg);
  const main = document.getElementById("play")!;
  main.insertAdjacentHTML("beforeend", `<p>${msg}</p>`);
}
function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function play(tag: keyof typeof list) {
  print("受信: " + tag);
  const file = sample(list[tag].files);
  print("再生: " + file);
  try {
    const source = context.createBufferSource();
    source.buffer = buffers[file];
    source.connect(context.destination);
    source.start();
  } catch (e) {
    print(e);
  }
}

export default function PlayContainer() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <title>👏Claphouse</title>
        <link rel="stylesheet" href="/style.css" />
        <style>
          {`
          button {
            font-size: 20vmin;
          }
        `}
        </style>
      </Head>
      <Play />
      <footer className="copyinfo">Built by kuboon</footer>
    </>
  );
}
let ws: WebSocket;
const wsHooks: Partial<WebSocket> = {
  onmessage: ({ data }) => play(data),
  onopen: () => print("接続しました"),
  onclose: () => {
    print("接続が切れました");
    setTimeout(()=>wsConnect(ws.url), 1000);
  },
};
function wsConnect(url: string) {
  if (ws) {
    ws.close();
  }
  ws = new WebSocket(url);
  Object.assign(ws, wsHooks);
}
export function Play() {
  if (!IS_BROWSER) {
    return (
      <main id="play">
        <p>loading..</p>
      </main>
    );
  }
  const params = new URLSearchParams(window.location.hash.substring(1));
  const uuid = params.get("uuid");
  const name = params.get("name");
  if (!uuid) {
    return <p>Invalid URL</p>;
  }
  const wsUrl = `wss://${location.host}/ws/${uuid}`;
  useEffect(()=>wsConnect(wsUrl), []);

  return (
    <main id="play">
      <h1>
        <a href="/" target="_blank">👏Claphouse</a>
      </h1>
      <p>{name}</p>
      <SoundToggle />
      {Object.entries(list).map(([tag, sound]) => (
        <button
          onClick={() => ws && ws.send(tag)}
        >
          {sound.button}
        </button>
      ))}
    </main>
  );
}
