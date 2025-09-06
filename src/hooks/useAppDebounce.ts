import { useEffect, useState } from "react";
import lodash from "lodash";
import { APP } from "@/constants/APP";

export const useAppDebounce = <T>(data: T, number: number = APP.DEBOUNCE.DELAY) => {
  const [state, setState] = useState<T>(data);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;

    if (typeof data === "object") {
      if (lodash.isEqual(data, state)) return;
    }
    if (data == state) return;

    timer = setInterval(() => {
      setState(data);
    }, number ?? APP.DEBOUNCE.DELAY);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, number]);

  return [state];
};
