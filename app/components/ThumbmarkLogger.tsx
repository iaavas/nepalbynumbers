"use client";
import axios from "axios";
import { useEffect } from "react";
import { getBrowserFingerprint } from "@/app/utils/getFingerprint";

const ThumbmarkLogger = () => {
  useEffect(() => {
    const logThumbprint = async () => {
      const fingerprint = await getBrowserFingerprint();

      const payload = {
        userAgent: (fingerprint.data.system as { useragent: string }).useragent,
        browserName: (fingerprint.data.system as { browser: { name: string } })
          .browser.name,
        fingerprint: fingerprint.hash,
      };

      const response = await axios.post("/api/log-fingerprint", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Fingerprint logged:", response);
    };

    logThumbprint();
  }, []);

  return null;
};

export default ThumbmarkLogger;
