/** @jsx h */
import { PageConfig, h, useCallback, useEffect, useState, useRef } from "../deps.ts";

export const config: PageConfig = { runtimeJS: true };

const list = {
  clap: {
    button: "👏",
    key: "c",
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
async function loadSounds() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
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
    setIsOn(!isOn);
    if (isOn) {
      context.resume();
    } else {
      context.suspend();
    }
  }, [isOn]);
  return (
    <div>
      <button onClick={onClick}>
        {isOn ? "🔇 ➡️🔈" : "🔇⬅️ 🔈"}
      </button>
    </div>
  );
}

function print(msg: string) {
  console.log(msg)
  //logElm.insertAdjacentHTML('afterbegin', `<p>${msg}</p>`)
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
export default function Room() {
  if (!window.location) return <p>loading</p>;
  const params = new URLSearchParams(window.location.hash.substring(1));
  const uuid = params.get("uuid");
  if (!uuid) {
    return <p>loading</p>;
  }
  const wsUrl = `wss://${location.host}/ws/${uuid}`
  const wsConnect = useCallback(()=>{
    const ws = new WebSocket(wsUrl);
    ws.onmessage = ({data}) => play(data);
    ws.onclose = () => {
      print("接続が切れました。");
      setTimeout(wsConnect, 1000);
    }
    wsRef.current = ws;
  }, [uuid])
  const wsRef = useRef<WebSocket>()
  useEffect(wsConnect, [])

  return (
    <div className="page">
      <head>
        <title>👏Claphouse</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <p className="logo">👏</p>
      <h1>Claphouse</h1>
      <p>{uuid}</p>
      <SoundToggle />
      {Object.entries(list).map(([tag, sound]) => (
        <button
          key={sound.key}
          onClick={() => wsRef.current!.send(tag)}
        >
          {sound.button}
        </button>
      ))}
      <p className="copyinfo">Built by kuboon</p>
    </div>
  );
}
