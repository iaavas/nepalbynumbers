// app/api/log-fingerprint/route.ts
import { db } from "@/app/libs/firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { NextResponse } from "next/server";

async function getCountryFromIP(ip: string) {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return {
      country: data.country_name || "Unknown",
      countryCode: data.country_code || "UN",
      city: data.city || "Unknown",
      region: data.region || "Unknown",
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    return {
      country: "Unknown",
      countryCode: "UN",
      city: "Unknown",
      region: "Unknown",
      error,
    };
  }
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userAgent, browserName, fingerprint } = body;

    let ipAddress = req.headers.get("x-real-ip") || "";
    const forwardedFor = req.headers.get("x-forwarded-for") || "";

    if (!ipAddress && forwardedFor) {
      ipAddress = forwardedFor.split(",")[0].trim();
    }
    ipAddress = ipAddress || "";

    const locationData = await getCountryFromIP(ipAddress);

    console.log(locationData);

    if (locationData.error) {
      return NextResponse.json({
        error: "Internal Server Error",
        message: locationData.error,
        status: 500,
      });
    }

    const fingerprintData = {
      userAgent,
      browserName,
      fingerprint,
      ipAddress,
      region: locationData.region,
      country: locationData.country,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, "fingerprints"),
      fingerprintData
    );

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error storing fingerprint:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const snapshot = await getDocs(collection(db, "fingerprints"));

    const fingerprints = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as {
        fingerprint: string;
        browserName: string;
        country: string;
        ipAddress: string;
      }),
    }));

    const uniqueUsers = new Set(
      fingerprints.map((fingerprint) => fingerprint.fingerprint)
    ).size;

    const browserData = fingerprints.reduce((acc, { browserName }) => {
      acc[browserName] = (acc[browserName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const countryData = fingerprints.reduce((acc, { country }) => {
      if (country) {
        acc[country] = (acc[country] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      fingerprints,
      uniqueUsers,
      browserData,
      countryData,
    });
  } catch (error) {
    console.error("Error fetching fingerprints:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
