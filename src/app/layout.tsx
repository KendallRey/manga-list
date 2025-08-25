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
  title: "MangaList – Never Forget a Manga Again",
  description:
    "MangaList helps you remember every manga title you read. Keep a simple list so you never forget, lose, or struggle to find your favorite series again. Built with Next.js and Supabase.",
  keywords: [
    "MangaList",
    "manga tracker",
    "remember manga",
    "manga list app",
    "track manga titles",
    "manga collection",
    "favorite manga",
    "never forget manga",
  ],
  authors: [{ name: "KenReyMozo" }],
  creator: "Kendall Rey Mozo",
  openGraph: {
    title: "MangaList – Never Forget a Manga Again",
    description:
      "Save manga titles in one place so you never forget or lose track of them.",
    url: "https://manga-list-ebon.vercel.app",
    siteName: "MangaList",
    images: [
      {
        url: "https://manga-list-ebon.vercel.app/og-image.png", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "MangaList Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://manga-list-ebon.vercel.app"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      data-theme="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
