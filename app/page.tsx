import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
      <div className="z-10 w-full   font-mono text-sm lg:flex flex-col mb-4">
        <h1 className="text-center font-bold text-6xl uppercase bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white w-full p-4 top-0 left-0">
          Nepal By Numbers
        </h1>
        <h3 className="text-center font-bold text-2xl my-8 font-sans ">
          Pick a template
        </h3>
        <ul className="font-bold  flex  gap-x-8 mt-8 justify-start items-center mx-6">
          <li className="border border-gray-400 flex flex-col  rounded-lg">
            <Link href={"/map/nepal-province"}>
              <h1 className="text-lg border-b border-gray-400 flex uppercase items-center justify-start p-2">
                Province
              </h1>

              <Image
                src={"/nepal-province.png"}
                alt="province"
                width={200}
                height={200}
                className="m-4 "
              />
            </Link>
          </li>
          <li className="border border-gray-400 flex flex-col  rounded-lg">
            <Link href={"/map/nepal-province"}>
              <h1 className="text-lg border-b border-gray-400 flex uppercase items-center justify-start p-2">
                District
              </h1>

              <Image
                src={"/nepal-district.jpg"}
                alt="province"
                width={200}
                height={200}
                className="m-4 "
              />
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
