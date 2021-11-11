/** @jsx h */
/** @jsxFrag Fragment */
import { SoundToggle } from "../components/SoundToggle.tsx";
import { PlayButtons, WireToggle, wsConnect } from "../components/WireToggle.tsx";
import { Log, log } from "../components/Log.tsx";
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
    <>
      <Head>
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
      <h1>
        <a href="/" target="_blank">👏Claphouse</a>
      </h1>
      <main id="play">
        <Play />
      </main>
      <footer className="copyinfo">Built by kuboon</footer>
    </>
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
      <SoundToggle />
      <WireToggle />
      <PlayButtons />
      <Log />
    </>
  );
}
