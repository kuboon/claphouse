/** @jsx h */
/** @jsxFrag Fragment */
import { SoundToggle } from "../components/SoundToggle.tsx";
import {
  PlayButtons,
  WireToggle,
  wsConnect,
} from "../components/WireToggle.tsx";
import { Log, log } from "../components/Log.tsx";
import Template from "../components/Template.tsx";
import {
  Fragment,
  h,
  Head,
  IS_BROWSER,
  PageConfig,
  useEffect,
} from "../deps.ts";

export const config: PageConfig = { runtimeJS: true };

export default function PlayContainer() {
  return (
    <Template>
      <Head>
        <style>
          {`
          button {
            font-size: 20vmin;
          }
        `}
        </style>
        {/* <script src="/inline-console.min.js" /> */}
      </Head>
      <main id="play">
        <Play />
      </main>
    </Template>
  );
}
function Play() {
  if (!IS_BROWSER) {
    return <p>loading..</p>;
  }
  const params = new URLSearchParams(window.location.hash.substring(1));
  const uuid = params.get("uuid");
  const name = params.get("name");
  if (!uuid) {
    return <p>Invalid URL</p>;
  }
  const wsUrl = `wss://${location.host}/ws/${uuid}`;
  useEffect(() => wsConnect(wsUrl), []);

  return (
    <>
      <h2>{name}</h2>
      <div className='toggles'>
        <WireToggle />
        <SoundToggle />
      </div>
      <PlayButtons />
      <Log />
    </>
  );
}
