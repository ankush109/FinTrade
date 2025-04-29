import React from "react";
import img2 from "../assets/de2.png";
import Image from "next/image";
function Details2() {
  return (
    <div className="flex justify-around  items-center  p-10">
      <div className="w-1/2 flex justify-center flex-col">
        <div className="font-semibold text-4xl  ">
          Sell Smarter With Fast, <br /> Secure Payments
        </div>
        <div className="text-gray-600 text-md mt-5">
          Make Every Transaction Count With A Payment System That's Built For
          Speed And Security.
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <div className="flex  items-center">
            <span className="text-gray-600 text-md ml-2">
              Instant Payment Insights
            </span>
          </div>
          <div className="flex  items-center">
            <span className="text-gray-600 text-md ml-2">
              Track Payments Instantly
            </span>
          </div>
        </div>
      </div>

      <div className="">
        <Image src={img2} alt="" width={500} height={500} />
      </div>
    </div>
  );
}

export default Details2;

// Sell Smarter With Fast, Secure Payments
// Make Every Transaction Count With A Payment System That's Built For Speed And Security.
// > Instant Payment Insights
// > Track Payments Instantly
