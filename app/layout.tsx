import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yoshi + Moshi · Become a Legend",
  description: "An interactive model of the Yoshi + Moshi exhibition by Nina Staehli.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="yoshi-moshi-jungle-loop.mp4"
          as="video"
          type="video/mp4"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
