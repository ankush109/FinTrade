import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import img1 from "./../assets/details.png";
import Image from "next/image";
function Details() {
  return (
    <div className=" flex p-10  items-center justify-center">
      <div className="w-1/2">
        <Image src={img1} alt="" width={500} height={500} />
      </div>
      <div className=" h-full items-start">
        <div className="font-semibold text-4xl  ">
          Streamline Sales With <br />
          Seamless Payments
        </div>
        <div className="text-gray-600 text-md mt-5">
          Deliver A Frictionless Buying Experience With Secure, Responsive, And
          Fully Integrated Payment Tools
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <div className="flex  items-center">
            <IoIosArrowForward />
            <span className="text-gray-600 text-md ml-2">
              Real-Time Payment Tracking
            </span>
          </div>
          <div className="flex  items-center">
            <IoIosArrowForward />
            <span className="text-gray-600 text-md ml-2">
              Accept Payments Quickly And Securely
            </span>
          </div>
          <div className="flex  items-center">
            <IoIosArrowForward />
            <span className="text-gray-600 text-md ml-2">
              Effortless Integration With Your Platform
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;

// Streamline Sales With Seamless Payments
// Deliver A Frictionless Buying Experience With Secure, Responsive, And Fully Integrated Payment Tools
// > Real-Time Payment Tracking
// > Accept Payments Quickly And Securely
// > Effortless Integration With Your Platform
