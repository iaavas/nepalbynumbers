"use client";

import Script from "next/script";
import { useEffect } from "react";

const OPENPIXEL_ID = "random-aavash";

export function OpenPixelScript() {
  useEffect(() => {
    window.opix =
      window.opix ||
      function () {
        (window.opix.q = window.opix.q || []).push(arguments);
      };
  }, []);

  return (
    <>
      <Script
        id="openpixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.opix=window.opix||function(){(window.opix.q=window.opix.q||[]).push(arguments)};
            opix('init', '${OPENPIXEL_ID}');
            opix('event', 'pageload');
          `,
        }}
      />
      <Script
        id="openpixel-main"
        src="https://cdn.jsdelivr.net/npm/openpixel@latest/dist/openpixel.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
