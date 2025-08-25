"use client";

import { CustomToggleTheme } from '@/components/custom/CustomToggleTheme';
import { PromptProvider } from '@/context/prompt-provider';
import { MangaStoreProvider } from '@/store/manga-store-provider';
import { ThemeProvider } from 'next-themes'
import { SnackbarProvider } from "notistack";
import { ReactNode } from 'react';

type Props = { children: ReactNode }
type ProviderProps = (p: Props) => JSX.Element;

export const composeProviders = (...p: ProviderProps[]) => 
  p.reduceRight(
    (Acc, P) => ({ children }: Props) => 
      <P><Acc>{children}</Acc></P>,
      ({ children }: Props) => <>{children}</>
  )

const StoreProviders = composeProviders(
  MangaStoreProvider
)

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
    <>
      <ThemeProvider  defaultTheme="system" enableSystem>
        <StoreProviders>
          <PromptProvider>
            <SnackbarProvider >
              <span className='fixed top-1 right-1'>
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

