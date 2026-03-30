import { useCallback, useState } from "preact/hooks";

type ToggleProps = { onClick: (newVal: boolean) => void; children: string };
export function useToggle(value = false) {
  const [isOn, setIsOn] = useState(value);
  const Toggle = ({ onClick, children }: ToggleProps) => {
    const onChange = useCallback(
      (e: Event) => {
        const { checked } = e.currentTarget as HTMLInputElement;
        setIsOn(checked);
        onClick(checked);
      },
      [onClick, setIsOn],
    );
    return (
      <label className="toggle">
        <input
          type="checkbox"
          className="toggle"
          checked={isOn}
          onChange={onChange}
        />
        {children}
      </label>
    );
  };
  return { Toggle, isOn, setIsOn };
}
