/** @jsx h */
/** @jsxFrag Fragment */
import { SoundToggle } from "../../components/SoundToggle.tsx";
import {
  PlayButtons,
  WireToggle,
  wsConnect,
} from "../../components/WireToggle.tsx";
import { Log, log } from "../../components/Log.tsx";
import Template from "../../components/Template.tsx";
import {
  Fragment,
  h,
  Head,
  IS_BROWSER,
  PageConfig,
  useEffect,
} from "../../deps.ts";
import QR from "../../components/QR.tsx";

export const config: PageConfig = { runtimeJS: true };

export default function PlayContainer({url}: {url: URL}) {
  const url2 = url || location
  const pageName = decodeURI(url2.pathname.split('/').pop()!)
  return (
    <Template pageName={pageName}>
      <Head>
        {/* <script src="/inline-console.min.js" /> */}
      </Head>
      <main id="play">
        <h2>{pageName}</h2>
        <Play />
      </main>
    </Template>
  );
}
function Play() {
  if (!IS_BROWSER) {
    return <p>loading..</p>;
  }
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
