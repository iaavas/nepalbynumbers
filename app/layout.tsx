import type { Metadata } from "next";
import { ValueProvider } from "@/app/context/ValueContext";
import "./globals.css";

import localFont from "@next/font/local";
import { ColorProvider } from "./context/ColorsContext";
import { PostfixProvider } from "./context/PostfixContext";
import { Analytics } from "@vercel/analytics/react";
import { SearchProvider } from "./context/SearchContext";

import { ReferenceProvider } from "./context/ReferenceContext";

import { HighlightProvider } from "./context/HighlightContext";
import { WatermarkProvider } from "./context/WatermarkContext";

//

const segoe = localFont({
  src: "../public/Regular.woff",
  variable: "--font-SegoeUI",
});

const quincy = localFont({
  src: "../public/QuincyCF.ttf",
  variable: "--font-quincy",
});

export const metadata: Metadata = {
  title: "Nepal By Numbers",
  description:
    "Explore Nepal through data with stunning map visualizations, custom infographics, and high-quality exports. Unlock the beauty of Nepal's numbers with easy-to-use templates and themes, ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${segoe.variable}  ${quincy.variable} `}>
      <head>
        <meta
          name="google-site-verification"
          content="nvtjxP7bXYX7hRhILhNreHHed7o58-aVX2T8KuVE4IM"
        />
      </head>
      <body>
        <ValueProvider>
          <ColorProvider>
            <PostfixProvider>
              <ReferenceProvider>
                <HighlightProvider>
                  <WatermarkProvider>
                    <SearchProvider>{children}</SearchProvider>
                  </WatermarkProvider>
                  <Analytics />
                </HighlightProvider>
              </ReferenceProvider>
            </PostfixProvider>
          </ColorProvider>
        </ValueProvider>
      </body>
    </html>
  );
}
