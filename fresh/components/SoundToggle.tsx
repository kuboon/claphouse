/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "../deps.ts";
import { context, prepareSounds } from "../lib/sound.ts";
import { useToggle } from "./useToggle.tsx";

export function SoundToggle() {
  const { Toggle } = useToggle();
  return <Toggle onClick={onClick}>🔊</Toggle>;
}
function onClick(newVal: boolean) {
  if (newVal) {
    prepareSounds().then(() => context?.resume());
  } else {
    context?.suspend();
  }
}
