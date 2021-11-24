/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "../deps.ts";
import { context, prepareSounds } from "../lib/sound.ts";
import { useToggle } from "./useToggle.tsx";
import { log } from "./Log.tsx";

export function SoundToggle() {
  const { Toggle, setIsOn } = useToggle();
  if (context) {
    context.onstatechange = () => {
      log(`context.state: ${context?.state}`);
      setIsOn(context?.state === "running");
    };
  }
  return <Toggle onClick={onClick}>🔊</Toggle>;
}
function onClick(newVal: boolean) {
  if (newVal) {
    prepareSounds().then(() => context?.resume());
  } else {
    context?.suspend();
  }
}
