import { centers } from "./constants/Centers";
import { Card, Col, Row } from "antd";
import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between mb-8">
      <h1 className="text-center font-bold text-6xl uppercase bg-gradient-to-r from-blue-800 via-cyan-500 to-indigo-800 text-white w-full p-4 top-0 left-0 shadow">
        Nepal By Numbers
      </h1>
      <h3 className="text-center font-bold text-4xl my-8 font-sans bg-blue-50/15 ">
        Pick a template
      </h3>

      <div className="flex  items-center justify-center flex-wrap gap-8 bg-blue-50/15 ">
        {Object.keys(centers).map((m, idx) => (
          <Link href={`/map?m=${m}`} key={idx}>
            <Card
              title={m.toUpperCase()}
              bordered={true}
              hoverable={true}
              className="font-sans text-center tracking-wider"
            >
              <div className="aspect-video	">
                <Image
                  src={`/home/${m}.png`}
                  height={300}
                  width={300}
                  objectFit="cover"
                  alt={m}
                />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
