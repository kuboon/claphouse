import { log } from "./Log.tsx";
import { useToggle } from "./useToggle.tsx";
import { list, play } from "../lib/sound.ts";

let setIsWire = (val: boolean) => {};
export function WireToggle() {
  const { Toggle, setIsOn } = useToggle(true);
  setIsWire = setIsOn;
  return <Toggle onClick={onClick}>📶</Toggle>;
}
function onClick(newVal: boolean) {
  if (newVal) {
    wsConnect(ws.url);
  } else {
    ws.close();
  }
}
export function PlayButtons() {
  return (
    <div class="buttons">
      {Object.entries(list).map(([tag, sound]) => (
        <button
          onClick={() => {
            ws.send(tag);
            play(tag);
          }}
        >
          {sound.button}
        </button>
      ))}
    </div>
  );
}

let ws: WebSocket;
const wsHooks: Partial<WebSocket> = {
  onmessage: ({ data }) => play(data),
  onopen: () => log("connected"),
  onclose: () => {
      log("disconnected");
      setIsWire(false);
  }
};
export function wsConnect(url: string) {
  if (ws) {
    ws.close();
  }
  try {
    ws = new WebSocket(url);
    Object.assign(ws, wsHooks);
  } catch (e) {
    setIsWire(false);
    log(e);
  }
}
