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
    <footer className="bg-[#1F2937] text-white p-4  w-[95%] mb-2 mx-auto  rounded-xl  ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 ">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4">nepal.by.numbers</h2>
            <p className="text-sm text-gray-300">
              Exploring Nepal through data and visualizations.
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/imaavas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <InstagramOutlined className="text-2xl" />
              </a>
              <a
                href="https://github.com/iaavas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <GithubOutlined className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com/in/aavashbaral"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <LinkedinOutlined className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-700 text-sm text-gray-300 flex flex-col md:flex-row justify-between items-center">
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
