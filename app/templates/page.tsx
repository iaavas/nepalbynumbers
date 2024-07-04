import { centers } from "../constants/Centers";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

import Header from "../components/ui/Header";
import UserNav from "../components/ui/UserNav";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between mb-8 ">
      <UserNav />
      <Header />
      <h3 className="text-center font-bold text-4xl my-8 font-sans bg-blue-50/15 ">
        Pick a Template
      </h3>

      <div className="flex  items-center justify-center flex-wrap gap-8 bg-blue-50/15 ">
        {Object.keys(centers).map((m, idx) => (
          <Link href={`/map?m=${m}`} key={idx}>
            <Card
              title={m.toUpperCase()}
              bordered={true}
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
