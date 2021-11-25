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

export const config: PageConfig = { runtimeJS: true };

export default function PlayContainer({ url }: { url: URL }) {
  const url2 = url || location;
  const pageName = url2.pathname.split("/").pop()!;
  return (
    <Template pageName={pageName}>
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
        <Play pageName={pageName} />
      </main>
    </Template>
  );
}
function Play({ pageName }: { pageName: string }) {
  if (!IS_BROWSER) {
    return <p>loading..</p>;
  }
  const uuid = location.hash.substring(1);
  const name = pageName;
  if (uuid === "") {
    return <p>Invalid URL</p>;
  }
  const wsUrl = `wss://${location.host}/ws/${uuid}`;
  useEffect(() => wsConnect(wsUrl), []);

  return (
    <>
      <h2>{name}</h2>
      <div className="toggles">
        <WireToggle />
        <SoundToggle />
      </div>
      <PlayButtons />
      <Log />
    </>
  );
}
