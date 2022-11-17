import { SoundToggle } from "../components/SoundToggle.tsx";
import {
  PlayButtons,
  WireToggle,
  wsConnect,
} from "../components/WireToggle.tsx";
import { Log, log } from "../components/Log.tsx";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

import QR from "../components/QR.tsx";

export default function Play() {
  if (!IS_BROWSER) return <div id="play">loading</div>;
  const uuid = location.hash.substring(1);
  if (uuid === "") {
    return <div id="play">Invalid URL</div>;
  }
  const wsUrl = `wss://${location.host}/ws/${uuid}`;
  useEffect(() => wsConnect(wsUrl), []);

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
