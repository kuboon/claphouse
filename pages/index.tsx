/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, Head, PageConfig, useState } from "../deps.ts";
import Template from "../components/Template.tsx";

export const config: PageConfig = { runtimeJS: true };
export default function Home() {
  return (
    <Template>
      <CreateRoom />
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
  params.append("name", name.value);
  params.append("uuid", uuid);
  const href = "/play#" + params.toString();
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
