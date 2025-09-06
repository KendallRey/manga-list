"use client";

import { createStore } from "zustand/vanilla";
import { resetErrors, setError, setErrors, setForm, setKeyValue, setOnChange, setOnCheck, setReset } from "./utils";
import { immer } from "zustand/middleware/immer";
import { IMangaTableInsert } from "@/utils/drizzle/schema";

export type MangaActions = StoreType;

export type MangaStore = FormStoreType<IMangaTableInsert> & MangaActions;

export const initMangaStore = (): IMangaTableInsert => {
  return {
    name: "",
  };
};

export const defaultInitState: IMangaTableInsert = {
  name: "",
};

export const createMangaStore = (initState: IMangaTableInsert = defaultInitState) => {
  return createStore<MangaStore>()(
    immer((set) => ({
      form: initState,
      error: {},
      setForm: (data) => setForm(set, data),
      onChange: (e) => setOnChange(set, e),
      onCheck: (e) => setOnCheck(set, e),
      setErrors: (err) => setErrors(set, err),
      reset: (data) => setReset(set, data ?? initState),
      setKeyValue: (k, v, o) => setKeyValue(set, k, v, o),
      setError: (k, e) => setError(set, k, e),
      resetErrors: (data) => resetErrors(set, data),
    })),
  );
};
