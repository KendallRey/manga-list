import { useDebounce, type Options } from "use-debounce";

export const DEBOUNCE = {
  DELAY: 500,
};

export const useAppDebounce = <T>(data: T, number?: number, options?: Options) =>
  useDebounce(data, number ?? DEBOUNCE.DELAY, options);
