/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, Head, PageConfig, useState } from "../deps.ts";
import Template from "../components/Template.tsx";

export const config: PageConfig = { runtimeJS: true };
export default function Home() {
  const msg = encodeURIComponent('👏Claphouse')
  return (
    <Template pageName="Create Room">
      <CreateRoom />
      <h2>Usage</h2>
      <ol>
        <li>Create a room for your online talk event</li>
        <li>Share the URL with your attendees</li>
        <li>Clap! Clap!</li>
        <li>📶 Connect to the remote room. You need to turn on after you suspend your browser.</li>
        <li>🔊 Play sound on your local device. It also receives others at the room.</li>
      </ol>
      <h2>使い方</h2>
      <ol>
        <li>オンライントークイベント用のツールです。まずは Create Room します。</li>
        <li>専用のURLが生成されますので、聴衆へシェア</li>
        <li>聴衆の拍手や笑い声が全員に伝わります。</li>
        <li>📶 ルームへ接続します。スマホをロックして復帰した後など、接続が切れることがありますのでオンにしてください。</li>
        <li>🔊 手元の端末から音を鳴らします。ルームへ接続中は、全員の音がなります。マナーモードだと音が鳴りませんのでご確認ください。</li>
      </ol>
    </Template>
  );
}
const useInput = (initialValue: string) => {
  const [value, set] = useState(initialValue);
  return {
    value,
    onChange: (e: Event) => set((e.target! as HTMLInputElement).value),
  };
};
function dec2hex (dec: number) {
  return dec.toString(16).padStart(2, "0")
}

// since Safari has no crypt.randomUUID()
function generateId(len = 40) {
  const arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}
function CreateRoom() {
  const name = useInput("");
  const uuid = generateId();

  const params = new URLSearchParams();
  const href = `/play/${name.value || " "}#${uuid}`
  return (
    <form>
      <label>
        Room Name<br />
        <input
          type="text"
          {...name}
        />
      </label>
      <div>
        <a href={href}>Create Room</a>
      </div>
    </form>
  );
}
