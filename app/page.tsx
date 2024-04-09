import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-10">
        <h1 className="text-center font-bold text-6xl uppercase bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white w-full p-4 top-0 left-0">
          Nepal By Numbers
        </h1>
        <ul className="font-bold  flex flex-1 gap-x-8">
          <li className="border flex flex-col p-4 rounded-md">
            <h1 className="text-lg border-b flex items-center justify-center p-4">
              Province
            </h1>
            <Link href={"/map/nepal-province"}>
              <Image
                src={"/nepal-province.png"}
                alt="province"
                width={200}
                height={200}
                className="m-4 p-2"
              />
            </Link>
          </li>
          <li className="border flex flex-col p-4 rounded-md">
            <h1 className="text-lg border-b flex items-center justify-center p-4">
              District
            </h1>
            <Link href={"/map/nepal-province"}>
              <Image
                src={"/nepal-district.jpg"}
                alt="province"
                width={200}
                height={200}
                className="m-4 p-2"
              />
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
