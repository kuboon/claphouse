import { useState } from "preact/hooks";

export default function CreateRoom() {
  const name = useInput("");
  const uuid = crypto.randomUUID();

  const href = `/play/${name.value || " "}#${uuid}`
  return (
    <form>
      <label>
        Room Name<br />
        <input
          type="text"
          {...name}
        />
      </label>
      <div>
        <a href={href}>Create Room</a>
      </div>
    </form>
  );
}

const useInput = (initialValue: string) => {
  const [value, set] = useState(initialValue);
  return {
    value,
    onChange: (e: Event) => {console.log('onchange'); 
    set((e.target! as HTMLInputElement).value)},
  };
};
