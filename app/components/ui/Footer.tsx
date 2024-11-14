import React from "react";
import Link from "next/link";
import { Instagram, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col text-center">
            <div className="text-gray-500 text-sm">
              &copy; {currentYear} nepal.by.numbers. All rights reserved.
            </div>
          </div>
          <div className="flex space-x-4 text-gray-500 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-700">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-gray-700">
              <Github size={18} />
            </a>
            <a href="#" className="hover:text-gray-700">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
