import { useCallback, useState } from "preact/hooks";

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
      <label className='toggle'>
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
