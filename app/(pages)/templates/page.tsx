"use client";
import { centers } from "../../constants/Centers";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import { OpenpixelTracker } from "@/lib/openpixel/tracker";
import Header from "../../components/ui/Header";

import withAuth from "../../components/withAuth";
import Footer from "../../components/ui/Footer";
import Navbar from "../../components/ui/Navbar";
function Home() {
  const handleClick = async (m: string) => {
    try {
      await OpenpixelTracker.getInstance().trackEvent("button_click", {
        buttonId: m,
        timestamp: Date.now(),

        page: window.location.pathname,
        referrer: document.referrer,
      });
    } catch (error) {
      console.error("Tracking failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex  flex-col items-center justify-between mb-8 ">
        <Header t={"Create Awesome Maps!"} />
        <h3 className="text-center font-bold text-xl my-8 font-sans tracking-wide ">
          Pick a Template
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3  mb-4  gap-12 ">
          {Object.keys(centers).map((m, idx) => (
            <Link href={`/map?m=${m}`} key={idx} onClick={() => handleClick(m)}>
              <Card
                title={m.toUpperCase()}
                bordered={true}
                className="font-sans text-center tracking-wider "
              >
                <div className="aspect-video	">
                  <Image
                    src={`/home/${m}.png`}
                    height={300}
                    width={300}
                    objectFit="cover"
                    alt={m}
                    priority
                  />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withAuth(Home);
