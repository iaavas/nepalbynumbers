import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-10">
        <h1 className="text-center font-bold text-6xl">Nepal By Numbers</h1>
        <ul className="font-bold text-green-600 flex flex-1 gap-x-8">
          <li>
            <Link href={"/map/nepal-province"}>
              <Image
                src={"/nepal-province.png"}
                alt="province"
                width={200}
                height={200}
              />
              <h1 className="text-3xl">Province</h1>
            </Link>
          </li>
          <li>
            <Link href={"/map/nepal-district"}>
              <Image
                src={"/nepal-district.jpg"}
                alt="province"
                width={200}
                height={200}
              />
              <h1 className="text-3xl">District</h1>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
