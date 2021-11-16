/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, Head, VNode } from "../deps.ts";

export default function Template(
  { children }: { children: VNode | VNode[] },
): VNode {
  return (
    <>
      <Head>
        <title>👏Claphouse</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>
      <h1>
        <a href="/" target="_blank">👏Claphouse</a>
      </h1>
      {children}
      <footer className="copyinfo">Built by <a href="https://twitter.com/kuboon">kuboon</a></footer>
    </>
  );
}
