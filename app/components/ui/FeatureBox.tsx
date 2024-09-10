import Image from "next/image";
import React from "react";

interface IFeatureBox {
  children: React.ReactNode;
  n: number;
  image: string;
}

const FeatureBox: React.FC<IFeatureBox> = ({ children, n, image }) => {
  return (
    <div className="flex flex-col gap-y-5 ">
      <p className="rounded-full p-2 bg-blue-600 text-white text-center mx-auto w-10">
        {n}
      </p>
      <div className="gap-y-4 border  p-4 mb-8 rounded-md bg-blue-100/5 shadow-sm">
        <div>
          <Image
            src={image}
            alt={image}
            width={500}
            height={500}
            className="mx-auto aspect-square  p-2"
          />
        </div>

        <div className="mt-8 ">{children}</div>
      </div>
    </div>
  );
};

export default FeatureBox;
