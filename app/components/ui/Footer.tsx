import React from "react";
import {
  InstagramOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bg-[#212e42] border text-white p-4 sm:px-3  px-2 flex items-center justify-center   sm:mx-8 mx-0 rounded-xl sm:mb-4  mb-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 ">
          <div className="flex flex-col">
            <h2 className="text-2xl  mb-4 text">nepal.by.numbers</h2>
            <p className="text-sm ">
              Exploring Nepal through data and visualizations.
            </p>
          </div>

          <div className="flex flex-col ml-16 sm:ml-8">
            <h3 className="text-lg  mb-4 ">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/imaavas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500 transition-colors "
              >
                <InstagramOutlined className="text-2xl" />
              </a>
              <a
                href="https://github.com/iaavas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors "
              >
                <GithubOutlined className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com/in/aavashbaral"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors "
              >
                <LinkedinOutlined className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t-2 border-dotted border-white text-sm  flex flex-col md:flex-row justify-between items-center ">
          <p>&copy; {currentYear} nepal.by.numbers. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Created by{" "}
            <Link
              href="https://www.github.com/iaavas"
              className="underline hover:text-white transition-colors"
            >
              Aavash Baral
            </Link>
          </p>
          <p className="mt-2 md:mt-0">
            <Link
              href="https://www.github.com/iaavas/nepalbynumbers"
              className="underline hover:text-white transition-colors"
            >
              Open source on GitHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
