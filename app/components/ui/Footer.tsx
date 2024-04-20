import React from "react";
import {
  InstagramOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-gray-400 w-full   p-2 shadow mt-4 text-white bg-cyan-700">
      <div className="flex justify-between items-center">
        <Link
          href={"https://www.instagram.com/aavashuvach"}
          className="flex items-center gap-x-4"
        >
          <InstagramOutlined className="text-xl  " />
          <span className="font-sans text-lg">Instagram</span>
        </Link>
        <Link
          href={"https://www.linkedin.com/in/aavashbaral"}
          className="flex items-center gap-x-4"
        >
          <LinkedinOutlined className="text-xl  " />
          <span className="font-sans text-lg">LinkedIn</span>
        </Link>
        <Link
          href={"https://www.github.com/iaavas"}
          className="flex items-center gap-x-4"
        >
          <GithubOutlined className="text-xl  " />
          <span className="font-sans text-lg">Github</span>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
