import type { ThemeProviderProps } from 'next-themes';
import localFont from 'next/font/local';
import ReactQueryProvider from './providers/query';
import { ThemeProvider } from './providers/theme';
import { Toaster } from './shadui/sonner';

export const SofiaProSoft = localFont({
  src: './fonts/SofiaProSoftReg.woff2',
  variable: '--font-sofia-pro-soft',
  weight: '100 900',
});

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ReactQueryProvider>
    <ThemeProvider {...properties}>{children}</ThemeProvider>
    <Toaster />
  </ReactQueryProvider>
);
