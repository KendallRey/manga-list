"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type MangaStore, createMangaStore, initMangaStore } from "@/store/manga-store";

export type MangaStoreApi = ReturnType<typeof createMangaStore>;

export const MangaStoreContext = createContext<MangaStoreApi | undefined>(undefined);

export interface MangaStoreProviderProps {
  children?: ReactNode;
}

export const MangaStoreProvider = ({ children }: MangaStoreProviderProps) => {
  const storeRef = useRef<MangaStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createMangaStore(initMangaStore());
  }

  return <MangaStoreContext.Provider value={storeRef.current}>{children}</MangaStoreContext.Provider>;
};

export const useMangaStore = <T,>(selector: (store: MangaStore) => T): T => {
  const mangaStoreContext = useContext(MangaStoreContext);

  if (!mangaStoreContext) {
    throw new Error(`useMangaStore must be used within MangaStoreProvider`);
  }

  return useStore(mangaStoreContext, selector);
};
