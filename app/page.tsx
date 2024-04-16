import { centers } from "./constants/Centers";
import { CompassOutlined } from "@ant-design/icons";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
      <div className="z-10 w-full   font-mono text-sm lg:flex flex-col mb-4">
        <h1 className="text-center font-bold text-6xl uppercase bg-gradient-to-r from-red-500 via-white-500 to-blue-500 text-white w-full p-4 top-0 left-0 shadow">
          Nepal By Numbers
        </h1>
        <h3 className="text-center font-bold text-2xl my-8 font-sans ">
          Pick a template
        </h3>
        <ul className="grid grid-cols-4 gap-x-4 gap-y-6 p-8 md:grid-cols-6 lg:grid-cols-4">
          {Object.keys(centers).map((m, idx) => (
            <Link href={`/map?m=${m}`} key={idx}>
              <li className="flex items-center  rounded-lg border-2 border-blue-800 p-2 text-center font-bold uppercase shadow-md transition-colors duration-300 hover:bg-gray-300 font-sans text-2xl gap-4 bg-gradient-to-r from-stone-100 to-blue-50">
                <CompassOutlined />
                {m}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </main>
  );
}
