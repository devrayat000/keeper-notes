import { useCallback, useState } from "react";

export default (initialState: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);

  return [
    state,
    useCallback(() => {
      setState((prev) => !prev);
    }, []),
  ];
};
