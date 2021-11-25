/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, Head, VNode } from "../deps.ts";

export default function Template(
  { pageName, children }: { pageName: string, children: VNode | VNode[] },
): VNode {
  const ogImage = `https://og.kbn.one/%F0%9F%91%8Fclaphouse%0A%0A${pageName}.png?theme=light&md=1&fontSize=200px`
  return (
    <>
      <Head>
        <title>{pageName} 👏Claphouse</title>
        <link rel="stylesheet" href="/style.css" />
        <meta name="og:image" content={ogImage} />
      </Head>
      <h1>
        <a href="/" target="_blank">👏Claphouse</a>
      </h1>
      {children}
      <footer className="copyinfo">Built by <a href="https://twitter.com/kuboon">kuboon</a></footer>
    </>
  );
}
