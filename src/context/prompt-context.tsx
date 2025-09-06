"use client";

import React, { createContext, useContext } from "react";

export type PromptOptions = {
  title?: string;
  message?: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
};

type PromptContextType = {
  ask: (options: PromptOptions) => Promise<boolean>;
};

export const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const usePrompt = () => {
  const ctx = useContext(PromptContext);
  if (!ctx) throw new Error("usePrompt must be used within PromptProvider");
  return ctx;
};
