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
      <p className="rounded-full p-2 bg-blue-800 text-white text-center  w-10 mx-auto">
        {n}
      </p>
      <div className="gap-y-4   p-4 mb-8 ">
        <div>
          <Image
            src={image}
            alt={image}
            width={400}
            height={200}
            className="mx-auto  p-2 border "
          />
        </div>

        <div className="mt-8 ">{children}</div>
      </div>
    </div>
  );
};

export default FeatureBox;
