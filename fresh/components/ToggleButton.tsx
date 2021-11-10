/** @jsx h */
import { h } from "../deps.ts";
export function ToggleButton({state, setState}: {state: boolean, setState: Function}) {
  const className = state ? "switch on" : "switch";
  return <div className={className} onClick={() => setState(!state)}></div>;
}
