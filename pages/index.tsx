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
function CreateRoom() {
  const name = useInput("");
  const uuid = crypto.randomUUID();
  const params = new URLSearchParams();
  params.append("name", name.value);
  params.append("uuid", uuid);

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
        <a href={"/play#" + params.toString()}>Create Room</a>
      </div>
    </form>
  );
}
