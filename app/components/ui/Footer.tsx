import React from "react";
import Link from "next/link";
import { Instagram, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-3">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold border-b-4 border-blue-800 w-fit rounded-br-sm">
              nepal.by.numbers
            </h2>
            <p className="text-gray-600 text-sm">
              Exploring Nepal through data and visualizations.
            </p>
          </div>

          {/* Connect Section */}
          <div className="flex flex-col md:items-end space-y-2">
            <h3 className=" font-medium">Connect</h3>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com/imaavas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://github.com/iaavas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/aavashbaral"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
            <p>&copy; {currentYear} nepal.by.numbers. All rights reserved.</p>

            <div className="flex flex-col md:flex-row md:space-x-6 items-center space-y-2 md:space-y-0">
              <p>
                Created by{" "}
                <Link
                  href="https://www.github.com/iaavas"
                  className="text-blue-800 hover:text-blue-700 transition-colors"
                >
                  Aavash Baral
                </Link>
              </p>
              <Link
                href="https://www.github.com/iaavas/nepalbynumbers"
                className="text-slate-600 hover:text-blue-700 transition-colors"
              >
                Open source on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
