import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="font-mont bg-gray-900 h-[400px] p-10 w-full flex flex-col text-gray-50">
      <div className="">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start ">
          {/* Brand and About */}
          <div className="">
            <h2 className="text-xl font-bold mb-3">FinTrade</h2>
            <p className="text-sm">
              Your trusted partner in financial trading. Stay ahead with our
              premium services.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full ml-20">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-col">
              <Link href="/" className="w-1/2 mb-2 hover:underline">
                Home
              </Link>
              <Link href="/services" className="w-1/2 mb-2 hover:underline">
                Services
              </Link>
              <Link href="/discussions" className="w-1/2 mb-2 hover:underline">
                Discussions
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/4 ">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-50 hover:text-blue-500"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-50 hover:text-blue-400"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-50 hover:text-pink-500"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-50 hover:text-blue-600"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}

        {/* Bottom Section */}
        <div className="mt-40 text-center">
          <div className="border-t border-gray-700 p-2 "></div>
          <p className="text-sm">© 2023 FinTrade — All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
