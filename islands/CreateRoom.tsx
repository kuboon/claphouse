/** @jsx h */
import { h, useState } from "../client_deps.ts";

export default function CreateRoom() {
  const name = useInput("");
  const uuid = generateId();

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

// since Safari has no crypt.randomUUID()
function generateId(len = 40) {
  const arr = new Uint8Array(len / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}
const useInput = (initialValue: string) => {
  const [value, set] = useState(initialValue);
  return {
    value,
    onChange: (e: Event) => {console.log('onchange'); 
    set((e.target! as HTMLInputElement).value)},
  };
};
function dec2hex (dec: number) {
  return dec.toString(16).padStart(2, "0")
}
