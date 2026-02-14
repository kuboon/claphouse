import { signal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

const logs = signal<string[]>([]);

export function log(msg: string) {
  console.log(msg);
  logs.value = [...logs.value, msg];
}

export function Log() {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTo({
        top: logRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [logs.value]);

  return (
    <div id="log" ref={logRef}>
      {logs.value.map((msg, i) => <p key={i}>{msg}</p>)}
    </div>
  );
}
