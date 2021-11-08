/** @jsx h */
import { h, IS_BROWSER, PageConfig } from "../deps.ts";


export const config: PageConfig = { runtimeJS: true };
export default function Home() {
  const uuid = IS_BROWSER ? crypto.randomUUID() : '---';
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
    </div>
  );
}
