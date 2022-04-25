/** @jsx h */
/** @jsxFrag Fragment */
import { h, useEffect } from "../client_deps.ts";
import { audioContext, prepareSounds } from "../lib/sound.ts";
import { useToggle } from "./useToggle.tsx";
import { log } from "./Log.tsx";

export function SoundToggle() {
  const { Toggle, setIsOn } = useToggle();
  const ctx = audioContext();
  useEffect(() => {
    if (ctx) {
      const onstatechange = () => {
        const state = audioContext()!.state as string;
        log(`audioContext.state: ${state}`);
        setIsOn(state === "running");
        if (state === "interrupted") {
          audioContext({ reconnect: true });
        }
      };
      ctx.onstatechange = onstatechange;
    }
  }, [ctx]);
  return <Toggle onClick={onClick}>🔊</Toggle>;
}
function onClick(newVal: boolean) {
  const ctx = audioContext();
  if (!ctx) return;
  if (newVal) {
    ctx.resume();
    prepareSounds();
  } else {
    ctx.suspend();
  }
}
