"use client";

import { CustomToggleTheme } from "@/components/custom/CustomToggleTheme";
import { PromptProvider } from "@/context/prompt-provider";
import { MangaStoreProvider } from "@/store/manga-store-provider";
import { ThemeProvider } from "next-themes";
import { SnackbarProvider } from "notistack";
import { ComponentType, PropsWithChildren, ReactNode } from "react";

type Props = { children?: ReactNode };
type ProviderProps = (p: Props) => JSX.Element;
type Provider = ComponentType<PropsWithChildren>;

export function composeProviders(...providers: ProviderProps[]) {
  return providers.reduceRight<Provider>(
    (Accumulated, Current, i) => {
      const Wrapped: React.FC<Props> = ({ children }) => (
        <Current>
          <Accumulated>{children}</Accumulated>
        </Current>
      );
      Wrapped.displayName = `ComposeProvider${i}`;
      return Wrapped;
    },
    ({ children }: Props): JSX.Element => <>{children}</>,
  );
}

const StoreProviders = composeProviders(MangaStoreProvider);

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
    <>
      <ThemeProvider defaultTheme="system" enableSystem>
        <StoreProviders>
          <PromptProvider>
            <SnackbarProvider>
              <span className="z-10 fixed top-1 right-1">
                <CustomToggleTheme />
              </span>
              {children}
            </SnackbarProvider>
          </PromptProvider>
        </StoreProviders>
      </ThemeProvider>
    </>
  );
};

export default Providers;
