import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="font-mont bg-gray-900 text-gray-50">
      <div className="container mx-auto px-5 py-10">
        {/* Top Section */}
        <div className="flex flex-wrap md:justify-between items-start">
          {/* Brand and About */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-3">FinTrade</h2>
            <p className="text-sm">
              Your trusted partner in financial trading. Stay ahead with our premium services.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-2/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-wrap">
              <Link href="/" className="w-1/2 mb-2 hover:underline">
                Home
              </Link>
              <Link href="/services" className="w-1/2 mb-2 hover:underline">
                Services
              </Link>
              <Link href="/discussions" className="w-1/2 mb-2 hover:underline">
                Discussions
              </Link>
              <Link href="/consultation" className="w-1/2 mb-2 hover:underline">
                Consultation
              </Link>
              <Link href="/articles" className="w-1/2 mb-2 hover:underline">
                Articles
              </Link>
              <Link href="/about" className="w-1/2 mb-2 hover:underline">
                About Us
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/4">
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
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">
            © 2023 FinTrade — All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
