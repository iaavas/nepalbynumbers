"use client";
import { centers } from "../constants/Centers";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";

import Header from "../components/ui/Header";
import Navbar from "../components/ui/Navbar";
import withAuth from "../components/withAuth";
import Footer from "../components/ui/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <main className="flex  flex-col items-center justify-between mb-8 bg-[#f9fafc]/5">
        <Header t={"Create Awesome Maps!"} />
        <h3 className="text-center font-bold text-xl my-8 font-sans tracking-wide ">
          Pick a Template
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3  mb-4  gap-8 bg-blue-50/15 ">
          {Object.keys(centers).map((m, idx) => (
            <Link href={`/map?m=${m}`} key={idx}>
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
