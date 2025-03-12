import { useCallback, useState } from "react";

export const useToggle = (
  defaultState = false,
): [boolean, () => void, (val: boolean) => void] => {
  const [state, setState] = useState<boolean>(defaultState);

  const override = useCallback((val: boolean) => {
    setState(val);
  }, []);

  const toggle = useCallback(() => {
    setState((val) => !val);
  }, []);

  return [state, toggle, override];
};
