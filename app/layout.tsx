import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ValueProvider } from "@/app/context/ValueContext";
import "./globals.css";

import localFont from "@next/font/local";
import { ColorProvider } from "./context/ColorsContex";
import { PostfixProvider } from "./context/PostfixContext";

const segoe = localFont({
  src: "../public/Segoe UI.woff",
  variable: "--font-SegoeUI",
});

export const metadata: Metadata = {
  title: "Nepal By Numbers",
  description: "Nepal is beyond words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${segoe.variable} font-sans `}>
      <body>
        <ValueProvider>
          <ColorProvider>
            <PostfixProvider>{children}</PostfixProvider>
          </ColorProvider>
        </ValueProvider>
      </body>
    </html>
  );
}
