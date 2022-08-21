/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";

export default function Chat() {
  const __html = `
    const chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute("page_id", "208708849165634");
    chatbox.setAttribute("attribution", "biz_inbox");
    window.fbAsyncInit = function() {
      FB.init({
        xfbml            : true,
        version          : 'v13.0'
      });
    };    
  `

  return (
    <>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" class="fb-customerchat" />
      <script dangerouslySetInnerHTML={{__html}} />
      <script src='https://connect.facebook.net/ja_JP/sdk/xfbml.customerchat.js' />
    </>
  );
}
