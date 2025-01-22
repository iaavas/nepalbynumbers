import { NextResponse } from "next/server";
import { addDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "@/app/libs/firebase/config";
import { TrackingEvent } from "@/lib/openpixel/tracker";

export async function POST(request: Request) {
  try {
    const data: TrackingEvent = await request.json();

    if (!data.eventName || !data.sessionId) {
      return NextResponse.json(
        { error: "Invalid tracking data" },
        { status: 400 }
      );
    }

    if (!data.timestamp) {
      data.timestamp = Date.now();
    }

    const eventsCollection = collection(db, "tracking_events");
    const docRef = await addDoc(eventsCollection, {
      ...data,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      eventId: docRef.id,
    });
  } catch (error) {
    console.error("Error processing tracking event:", error);
    return NextResponse.json(
      { error: "Failed to process tracking event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "tracking_events"));

    const buttonClickCounts: Record<string, number> = {};

    snapshot.forEach((doc) => {
      console.log(doc.data());
      const data = doc.data();
      const buttonId = data.eventData.buttonId || "unknown";
      buttonClickCounts[buttonId] = (buttonClickCounts[buttonId] || 0) + 1;
    });

    return NextResponse.json({ buttonClickCounts });
  } catch (error) {
    console.error("Error fetching button click data:", error);
    return NextResponse.json(
      { error: "Failed to fetch button click data" },
      { status: 500 }
    );
  }
}
