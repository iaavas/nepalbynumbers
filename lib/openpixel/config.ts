export const OPENPIXEL_CONFIG = {
  PIXEL_ENDPOINT:
    process.env.NEXT_PUBLIC_PIXEL_ENDPOINT || "http://localhost:3000/pixel.gif",
  JS_ENDPOINT:
    process.env.NEXT_PUBLIC_JS_ENDPOINT ||
    "http://localhost:3000/openpixel/openpixel.min.js",
  PIXEL_FUNC_NAME: "opix", // The global function name to trigger events
  APP_ID:
    process.env.NEXT_PUBLIC_OPENPIXEL_APP_ID ||
    "1:734282997544:web:a411a9da9aff9b24df7a1d",
};
