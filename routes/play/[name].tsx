import Template from "../../components/Template.tsx";
import Play from "../../islands/Play.tsx";
// import { Head } from "$fresh/runtime.ts";

export default function PlayContainer({ url }: { url: URL }) {
  const url2 = url || location;
  const pageName = decodeURI(url2.pathname.split("/").pop()!);
  return (
    <Template pageName={pageName}>
      <main>
        <h2>{pageName}</h2>
        <Play />
      </main>
    </Template>
  );
}
