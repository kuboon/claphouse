/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, Head, PageConfig, useState } from "../deps.ts";

export const config: PageConfig = { runtimeJS: true };
const useInput = (initialValue: string) => {
  const [value, set] = useState(initialValue);
  return {
    value,
    onChange: (e: Event) => set((e.target! as HTMLInputElement).value),
  };
};
function CreateRoom() {
  const name = useInput("test");
  const uuid = crypto.randomUUID();
  const params = new URLSearchParams();
  params.append("name", name.value);
  params.append("uuid", uuid);

  return (
    <>
      <label>
        Room Name{" "}
        <input
          type="text"
          {...name}
        />
      </label>
      <a href={"/play#" + params.toString()}>Create Room</a>;
    </>
  );
}
export default function Home() {
  return (
    <div>
      <Head>
        <title>👏Claphouse</title>
        <link rel="stylesheet" href="/style/index.css" />
      </Head>
      <h1>👏Claphouse</h1>
      <p>
      </p>
      <CreateRoom name={name.value} />
    </div>
  );
}
