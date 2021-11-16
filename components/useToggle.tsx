/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, useCallback, useState } from "../deps.ts";

type ToggleProps = { onClick: (newVal: boolean) => void; children: string };
export function useToggle(value = false) {
  const [isOn, setIsOn] = useState(value);
  const Toggle = ({ onClick, children }: ToggleProps) => {
    const onChange: h.JSX.GenericEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        const { checked } = e.currentTarget;
        setIsOn(checked);
        onClick(checked);
      },
      [onClick, setIsOn],
    );
    return (
      <>
        <input
          type="checkbox"
          className="toggle"
          checked={isOn}
          onChange={onChange}
        />
        {children}
      </>
    );
  };
  return { Toggle, isOn, setIsOn };
}
