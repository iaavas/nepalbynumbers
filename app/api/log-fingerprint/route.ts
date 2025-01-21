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
    // Using ipapi.co as it's free and doesn't require API key for low volume
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return {
      country: data.country_name,
      countryCode: data.country_code,
      city: data.city,
      region: data.region,
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    return {
      country: "Unknown",
      countryCode: "UN",
      city: "Unknown",
      region: "Unknown",
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
    ipAddress = ipAddress || "Unknown";

    // Get location data from IP
    const locationData = await getCountryFromIP(ipAddress);

    const fingerprintData = {
      userAgent,
      browserName,
      fingerprint,
      ipAddress,
      ...locationData,
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
      }),
    }));

    const uniqueUsers = new Set(
      fingerprints.map((fingerprint) => fingerprint.fingerprint)
    ).size;

    // Group by browser
    const browserData = fingerprints.reduce((acc, { browserName }) => {
      acc[browserName] = (acc[browserName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Group by country
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
