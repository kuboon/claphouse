/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "../deps.ts";
import { log } from "./Log.tsx";
import { useToggle } from "./useToggle.tsx";
import { list, play } from "../lib/sound.ts";

export function WireToggle() {
  const { Toggle, setIsOn } = useToggle();
  if (ws) {
    ws.onclose = () => {
      log("切断しました");
      setIsOn(false);
    };
  }
  return <Toggle onClick={onClick}>📶</Toggle>;
}
function onClick(newVal: boolean) {
  if (newVal) {
    wsConnect(ws.url);
  } else {
    ws.onclose = () => {
      log("切断しました");
    };
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
  onopen: () => log("接続しました"),
};
export function wsConnect(url: string) {
  if (ws) {
    ws.close();
  }
  ws = new WebSocket(url);
  Object.assign(ws, wsHooks);
}
