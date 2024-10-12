import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import Providers from "@/services/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Manga List",
  description: "Because I want to try Drizzle and NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
