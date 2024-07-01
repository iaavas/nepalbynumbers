"use client";
import { centers } from "./constants/Centers";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InstagramOutlined } from "@ant-design/icons";
import { auth } from "./firebase";
import Loader from "./components/ui/Loader";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "./components/ui/Header";

export default function Home() {
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useLayoutEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (!user) {
  //       router.push("/auth");
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [router]);

  // if (isLoading) {
  //   return (
  //     <>
  //       <Header />
  //       <div className="flex items-center justify-center p-8">
  //         <ClipLoader size={200} color="blue" />
  //       </div>
  //     </>
  //   );
  // }

  return (
    <main className="flex  flex-col items-center justify-between mb-8 ">
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
