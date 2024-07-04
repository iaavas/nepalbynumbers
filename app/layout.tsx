import type { Metadata } from "next";

import { ValueProvider } from "@/app/context/ValueContext";
import "./globals.css";
import { cookies } from "next/headers";

import localFont from "@next/font/local";
import { ColorProvider } from "./context/ColorsContext";
import { PostfixProvider } from "./context/PostfixContext";
import { Analytics } from "@vercel/analytics/react";
import { SearchProvider } from "./context/SearchContext";
import { SESSION_COOKIE_NAME } from "@/constants";
import { useUserSession } from "./hooks/use-user-session";
import { ReferenceProvider } from "./context/ReferenceContext";
import { SessionProvider } from "./context/SessionContext";

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
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  return (
    <html lang="en" className={`${segoe.variable} font-sans `}>
      <head>
        <meta
          name="google-site-verification"
          content="nvtjxP7bXYX7hRhILhNreHHed7o58-aVX2T8KuVE4IM"
        />
      </head>
      <body>
        <SessionProvider session={session}>
          <ValueProvider>
            <ColorProvider>
              <PostfixProvider>
                <ReferenceProvider>
                  <SearchProvider>{children}</SearchProvider>
                  {/* <Analytics /> */}
                </ReferenceProvider>
              </PostfixProvider>
            </ColorProvider>
          </ValueProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
