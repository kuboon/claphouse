/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, useCallback, useState } from "../deps.ts";

type ToggleProps = { onClick: (newVal: boolean) => void; children: string };
export function useToggle() {
  const [isOn, setIsOn] = useState(false);
  const Toggle = ({ onClick, children }: ToggleProps) => {
    const onClick2 = useCallback(() => {
      const newVal = !isOn;
      setIsOn(newVal);
      onClick(newVal);
    }, [isOn]);
    const className = isOn ? "switch on" : "switch";
    return (
      <>
        <span className={className} onClick={onClick2} />
        {children}
      </>
    );
  };
  return { Toggle, isOn, setIsOn };
}
