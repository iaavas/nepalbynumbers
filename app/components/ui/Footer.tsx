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
    <footer className=" bg-[#282828] text-white p-4 px-8     mx-8 rounded-xl mb-4  ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 ">
          <div className="flex flex-col">
            <h2 className="text-2xl  mb-4 text">nepal.by.numbers</h2>
            <p className="text-sm text-white">
              Exploring Nepal through data and visualizations.
            </p>
          </div>

          <div className="flex flex-col ml-16 sm:ml-0">
            <h3 className="text-lg  mb-4 text-white">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/imaavas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500 transition-colors text-white"
              >
                <InstagramOutlined className="text-2xl" />
              </a>
              <a
                href="https://github.com/iaavas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors text-white"
              >
                <GithubOutlined className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com/in/aavashbaral"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors text-white"
              >
                <LinkedinOutlined className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-800 text-sm text-white flex flex-col md:flex-row justify-between items-center">
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
