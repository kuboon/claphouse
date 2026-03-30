import { SoundToggle } from "../components/SoundToggle.tsx";
import {
  PlayButtons,
  WireToggle,
  wsConnect,
} from "../components/WireToggle.tsx";
import { Log } from "../components/Log.tsx";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "fresh/runtime";

import QR from "../components/QR.tsx";

export default function Play() {
  useEffect(() => {
    const uuid = location.hash.substring(1);
    if (uuid === "") return;
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${location.host}/ws/${uuid}`;
    wsConnect(wsUrl);
  }, []);
  if (!IS_BROWSER) return <div id="play">loading</div>;

  return (
    <div id="play">
      <div className="toggles">
        <WireToggle />
        <SoundToggle />
        <QR data={location.toString()} />
      </div>
      <PlayButtons />
      <Log />
    </div>
  );
}
