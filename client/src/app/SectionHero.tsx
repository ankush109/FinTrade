import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";

function SectionHero() {
  return (
    <>
      <div className="  bg-gradient-to-r from-white  to-purple-200 h-screen ">
        <Navbar />
        <div className="grid   grid-cols-2 gap-5 p-10 items-center justify-center">
          <div className="flex  justify-center gap-10 flex-col  mb-20">
            <div className="text-6xl font-bold">
              Invent Intelligently <br />
              Live Independently
            </div>
            <div className="text-gray-600 text-md">
              Your all-in-one solution to smarter money management. Track
              spending, set goals, and make informed financial decisions with
              clarity and ease.
            </div>
          </div>
          <div className="mt-10 flex items-center justify-center">
            <Image
              src="https://design4users.com/wp-content/uploads/2020/02/personal-finance-app-design.png"
              className=""
              alt="hero"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionHero;
