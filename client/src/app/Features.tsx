import React from "react";
import { MdArrowOutward } from "react-icons/md";

function Features() {
  return (
    <div className="flex flex-col p-10 m-10">
      <div className="text-center text-4xl font-semibold">Our Features</div>
      <div className="grid grid-cols-3 gap-10  mt-20  w-full">
        <div className="bg-yellow-100  p-6  gap-10 flex flex-col h-[300px]  rounded-lg ">
          <div className="flex  gap-2 justify-between">
            <span className="text-gray-600 text-2xl font-bold">
              Secure Account
              <br />
              Login
            </span>
            <div className="bg-gray-200 w[50px] h-[40px] p-2 rounded-full flex items-center justify-center">
              <MdArrowOutward size={25} />
            </div>
          </div>
          <div className="text-gray-600 text-lg mt-5">
            Protect Your Financial Data With Secure Account Login, Featuring
            Encryption And 2-Factor Authentication For Peace Of Mind.
          </div>
        </div>
        <div className="bg-purple-100  p-6  gap-10 flex flex-col h-[300px]  rounded-lg ">
          <div className="flex  gap-2 justify-between">
            <span className="text-gray-600 text-2xl font-bold">
              Secure Account
              <br />
              Login
            </span>
            <div className="bg-gray-200 w[50px] h-[40px] p-2 rounded-full flex items-center justify-center">
              <MdArrowOutward size={25} />
            </div>
          </div>
          <div className="text-gray-600 text-lg mt-5">
            Protect Your Financial Data With Secure Account Login, Featuring
            Encryption And 2-Factor Authentication For Peace Of Mind.
          </div>
        </div>
        <div className="bg-green-100  p-6  gap-10 flex flex-col h-[300px]  rounded-lg ">
          <div className="flex  gap-2 justify-between">
            <span className="text-gray-600 text-2xl font-bold">
              Secure Account
              <br />
              Login
            </span>
            <div className="bg-gray-200 w[50px] h-[40px] p-2 rounded-full flex items-center justify-center">
              <MdArrowOutward size={25} />
            </div>
          </div>
          <div className="text-gray-600 text-lg mt-5">
            Protect Your Financial Data With Secure Account Login, Featuring
            Encryption And 2-Factor Authentication For Peace Of Mind.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
