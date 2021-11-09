/** @jsx h */
import {
  h,
  Head,
  PageConfig,
  Suspense,
  useCallback,
  useState,
} from "../deps.ts";

export const config: PageConfig = { runtimeJS: true };
function CreateRoom({ name }: { name: string }) {
  const uuid = crypto.randomUUID();
  const params = new URLSearchParams();
  params.append("name", name);
  params.append("uuid", uuid);

  return <a href={"/play#" + params.toString()}>Create Room</a>;
}
export default function Home() {
  const useInput = (initialValue: string) => {
    const [value, set] = useState(initialValue)
    return { value, onChange: (e: Event) => set((e.target! as HTMLInputElement).value) }
  };

  const name = useInput("test");
  return (
    <div>
      <Head>
        <title>👏Claphouse</title>
        <link rel="stylesheet" href="/style/index.css" />
      </Head>
      <h1>👏Claphouse</h1>
      <p>
        <label>
          Room Name<input
            type="text"
            {...name}
          />
        </label>
      </p>
      {name.value}
        <CreateRoom name={name.value} />
    </div>
  );
}
