/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "preact";

export function log(msg: string) {
  console.log(msg);
  const elm = document.getElementById("log")!;
  elm.insertAdjacentHTML("beforeend", `<p>${msg}</p>`);
  elm.scrollTo({
    top: elm.clientHeight,
    left: 0,
    behavior: 'smooth'
  });
}


export function Log() {
  return <div id='log'></div>;
}
