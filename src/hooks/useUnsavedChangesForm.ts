import { clearInitialState, setInitialState } from "@/redux/features/prompt/unsavedChangesSlice";
import { useAppDispatch } from "@/redux/services/hooks";
import { useCallback } from "react";

/**
 * Hook to manage form state of unsaved form state.
 *
 * @returns {Object} An object containing:
 * - `setForm`: A function to update the initial state with the current form object.
 * - `clearForm`: A function to clear the initial state.
 */
export const useUnsavedChangesForm = () => {
  const dispatch = useAppDispatch();

  /**
   * Sets the initial state to the current form object.
   *
   * @param {any} form - The current state of the form object.
   */
  const setForm = useCallback(
    (form: any) => {
      dispatch(setInitialState(form));
    },
    [dispatch],
  );

  /**
   * Clears the initial state.
   */
  const clearForm = useCallback(() => {
    dispatch(clearInitialState());
  }, [dispatch]);

  return {
    setForm,
    clearForm,
  };
};
