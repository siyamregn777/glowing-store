import React from "react";
import Image from "next/image";
import image from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        
        <div className="w-4/5">
          <Image 
            className="w-24 md:w-28" 
            src={image} 
            width={112}
            height={40} 
            alt="logo" 
          />
          <p className="mt-3 text-sm">
            Founded in 2015, we started as a small team with a big dream: 
            to revolutionize online shopping. What began as a passion project 
            in a garage has grown into a trusted e-commerce platform serving 
            millions of customers worldwide.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="/">Home</a>
              </li>
              <li>
                <a className="hover:underline transition" href="/about">About us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="/contact">Contact us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+1-234-567-890</p>
              <p>sales@glowingstore.com</p>
            </div>
          </div>
        </div>

      </div>

      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © Glowing Store. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
