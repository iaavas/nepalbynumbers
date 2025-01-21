import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

export const getBrowserFingerprint = async () => {
  const fingerprint = await getFingerprint(true);
  return fingerprint;
};
