"use client";
import { centers } from "./constants/Centers";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InstagramOutlined } from "@ant-design/icons";

import Loader from "./components/ui/Loader";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "./components/ui/Header";
import HeroSection from "./components/ui/HeroSection";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

export default function Page() {
  return (
    <main className="p-0  ">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
