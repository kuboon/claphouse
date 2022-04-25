/** @jsx h */
/** @jsxFrag Fragment */
import { SoundToggle } from "../components/SoundToggle.tsx";
import {
  PlayButtons,
  WireToggle,
  wsConnect,
} from "../components/WireToggle.tsx";
import { Log, log } from "../components/Log.tsx";
import {
  Fragment,
  h,
  useEffect,
  IS_BROWSER
} from "../client_deps.ts";
import QR from "../components/QR.tsx";

export default function Play() {
  if(!IS_BROWSER)return <p>loading</p>
  const uuid = location.hash.substring(1)
  if (uuid === "") {
    return <p>Invalid URL</p>;
  }
  const wsUrl = `wss://${location.host}/ws/${uuid}`;
  useEffect(() => wsConnect(wsUrl), []);

  return (
    <>
      <div className='toggles'>
        <WireToggle />
        <SoundToggle />
        <QR data={location.toString()} />
      </div>
      <PlayButtons />
      <Log />
    </>
  );
}
