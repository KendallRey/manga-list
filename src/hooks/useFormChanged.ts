import { useMemo } from "react";
import { useAppSelector } from "@/redux/services/hooks";
import { isFormObjectEqual } from "@/components/helper/form";

/**
 * Hook to manage form state and determine if a form object has changed compared to an initial state.
 * @param form - The current state of the form object.
 * @param initialState - Optional. The initial state of the form object. Defaults to `undefined` or `state` for unsaved changes slice.
 * @returns An object containing:
 * - `isChanged`: A function returning `true` if the form has changed, `false` otherwise.
 */
export const useFormChanged = (form: any, initialState?: any) => {
  /**
   * Retrieves the initial state from Redux store.
   */
  const state = useAppSelector((state) => state.unsavedChangesSlice.state);

  /**
   * Checks if the form object has changed compared to the initial state.
   * @returns `true` if the form has changed, `false` otherwise.
   */
  const isChanged = useMemo(() => {
    const _state = initialState || state;
    if (!_state) return false;
    return !isFormObjectEqual(form, _state);
  }, [form, state, initialState]);

  return {
    isChanged: isChanged,
  };
};
