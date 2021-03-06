/** @jsx h */
/** @jsxFrag Fragment */
import Template from "../components/Template.tsx";
import CreateRoom from "../islands/CreateRoom.tsx";
import { h } from "../client_deps.ts";
import Chat from "../components/Chat.tsx";

export default function Home() {
  return (
    <Template pageName="Create Room">
      <CreateRoom />
      <h2>Usage</h2>
      <ol>
        <li>Create a room for your online talk event</li>
        <li>Share the URL with your attendees</li>
        <li>Clap! Clap!</li>
        <li>ð¶ Connect to the remote room. You need to turn on after you suspend your browser.</li>
        <li>ð Play sound on your local device. It also receives others at the room.</li>
      </ol>
      <h2>ä½¿ãæ¹</h2>
      <ol>
        <li>ãªã³ã©ã¤ã³ãã¼ã¯ã¤ãã³ãç¨ã®ãã¼ã«ã§ããã¾ãã¯ Create Room ãã¾ãã</li>
        <li>å°ç¨ã®URLãçæããã¾ãã®ã§ãè´è¡ã¸ã·ã§ã¢</li>
        <li>è´è¡ã®ææãç¬ãå£°ãå¨å¡ã«ä¼ããã¾ãã</li>
        <li>ð¶ ã«ã¼ã ã¸æ¥ç¶ãã¾ããã¹ãããã­ãã¯ãã¦å¾©å¸°ããå¾ãªã©ãæ¥ç¶ãåãããã¨ãããã¾ãã®ã§ãªã³ã«ãã¦ãã ããã</li>
        <li>ð æåã®ç«¯æ«ããé³ãé³´ããã¾ããã«ã¼ã ã¸æ¥ç¶ä¸­ã¯ãå¨å¡ã®é³ããªãã¾ããããã¼ã¢ã¼ãã ã¨é³ãé³´ãã¾ããã®ã§ãç¢ºèªãã ããã</li>
      </ol>
      <Chat />
    </Template>
  );
}
