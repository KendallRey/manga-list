"use client";

type SetFnType<T extends Record<string, unknown>> = (fn: (state: FormStoreType<T>) => void) => void;

// #region setForm
export const setForm = <T extends Record<string, unknown>>(set: SetFnType<T>, data: T) => {
  return set((state: FormStoreType<T>) => {
    state.form = data;
    state.error = {};
  });
};
// #endregion

// #region setOnChange
export const setOnChange = <T extends Record<string, unknown>>(
  set: SetFnType<T>,
  e: RCE<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value } = e.target;
  return set((state: FormStoreType<T>) => {
    state.form = { ...state.form, [name]: value };
    state.error = { ...state.error, [name]: undefined };
  });
};
// #endregion

// #region setOnCheck
export const setOnCheck = <T extends Record<string, unknown>>(set: SetFnType<T>, e: RCE<HTMLInputElement>) => {
  const { name, type, checked, value } = e.target;
  return set((state: FormStoreType<T>) => {
    state.form = { ...state.form, [name]: type == "checkbox" ? checked : value };
    state.error = { ...state.error, [name]: undefined };
  });
};
// #endregion

// #region setErrors
export const setErrors = <T extends Record<string, unknown>>(set: SetFnType<T>, err?: Record<string, unknown>) => {
  return set((state: FormStoreType<T>) => {
    state.error = err ?? {};
  });
};
// #endregion

// #region setReset
export const setReset = <T extends Record<string, unknown>>(set: SetFnType<T>, data: T) => {
  return set((state: FormStoreType<T>) => {
    state.form = data;
    state.error = {};
  });
};
// #endregion

// #region setError
export const setError = <T extends Record<string, unknown>>(set: SetFnType<T>, key: string, error: string) => {
  return set((state: FormStoreType<T>) => {
    state.error = { ...state.error, [key]: error };
  });
};
// #endregion

// #region resetErrors
export const resetErrors = <T extends Record<string, unknown>>(
  set: SetFnType<T>,
  data?: Partial<Record<string, unknown>>,
) => {
  return set((state: FormStoreType<T>) => {
    state.error = (data ?? {}) as Partial<Record<string | keyof T, string>>;
  });
};
// #endregion

// #region setKeyValue
export const setKeyValue = <T extends Record<string, unknown>>(
  set: SetFnType<T>,
  key: string,
  value: unknown,
  options?: StoreTypeOptions,
) => {
  return set((state: FormStoreType<T>) => {
    if (options?.isChanged != false) state.isChanged = true;
    state.form = { ...state.form, [key]: value };
    state.error = { ...state.error, [key]: "" };
  });
};
// #endregion
