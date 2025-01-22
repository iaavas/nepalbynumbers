import { OPENPIXEL_CONFIG } from "./config";
export type TrackingEventData = {
  buttonId?: string;
  timestamp?: number;
  [key: string]: any;
};

export type TrackingEvent = {
  eventName: string;
  eventData: TrackingEventData;
  userId?: string;
  sessionId: string;
  userAgent: string;
  timestamp: number;
};

export class OpenpixelTracker {
  private static instance: OpenpixelTracker;
  private sessionId: string;

  private constructor() {
    this.sessionId = this.generateSessionId();
  }

  static getInstance(): OpenpixelTracker {
    if (!OpenpixelTracker.instance) {
      OpenpixelTracker.instance = new OpenpixelTracker();
    }
    return OpenpixelTracker.instance;
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  async trackEvent(eventName: string, eventData?: TrackingEventData) {
    // First, call original OpenPixel tracking
    if (typeof window !== "undefined") {
      // @ts-ignore
      const pixelFunc = window[OPENPIXEL_CONFIG.PIXEL_FUNC_NAME];
      if (typeof pixelFunc === "function") {
        pixelFunc("event", eventName, eventData);
      }
    }

    const trackingEvent: TrackingEvent = {
      eventName,
      eventData: eventData || {},
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackingEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to send tracking data");
      }
    } catch (error) {
      console.error("Error sending tracking data:", error);
    }
  }
}
