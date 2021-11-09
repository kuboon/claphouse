/** @jsx h */
import { h, Head, PageConfig, Suspense } from "../deps.ts";

export const config: PageConfig = { runtimeJS: true };
function CreateRoom() {
  const uuid = crypto.randomUUID();
  const params = new URLSearchParams();
  params.append("uuid", uuid);

  return <a href={"/play#" + params.toString()}>Create Room</a>;
}
export default function Home() {
  return (
    <div>
      <Head>
        <title>👏Claphouse</title>
        <link rel="stylesheet" href="/style/index.css" />
      </Head>
      <p className="logo">👏</p>
      <h1>Claphouse</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CreateRoom />
      </Suspense>
    </div>
  );
}
