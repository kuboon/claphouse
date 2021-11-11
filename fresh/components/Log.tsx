/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "../deps.ts";

export function log(msg: string) {
  const elm = document.getElementById("log");
  elm?.insertAdjacentHTML("beforeend", `<p>${msg}</p>`);
}


export function Log() {
  return <div id='log'></div>;
}
