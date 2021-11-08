/** @jsx h */
import { h, IS_BROWSER, PageConfig } from "../deps.ts";


export default function Home() {
  const uuid = crypto.randomUUID();
  const params = new URLSearchParams();
  params.append('uuid', uuid);

  return (
    <div>
      <head>
        <title>👏Claphouse</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <p className="logo">👏</p>
      <h1>Claphouse</h1>
      <a href={'/play#' + params.toString()} >Create Room</a>
      <p>{IS_BROWSER ? "Viewing browser render." : "Viewing JIT render."}</p>
    </div>
  );
}

//export const config: PageConfig = { runtimeJS: true };
