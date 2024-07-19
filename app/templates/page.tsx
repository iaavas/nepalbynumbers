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
      <main className="flex  flex-col items-center justify-between mb-0 ">
        <Header t={"Create Awesome Maps!"} />
        <h3 className="text-center font-bold text-xl my-8 font-sans bg-blue-50/15 ">
          Pick a Template
        </h3>

        <div className="flex mb-4 items-center justify-center flex-wrap gap-8 bg-blue-50/15 ">
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
        <Footer />
      </main>
    </>
  );
}

export default withAuth(Home);
