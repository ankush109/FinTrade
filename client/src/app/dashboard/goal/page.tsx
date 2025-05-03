import { Button } from "@/components/ui/button";
import React from "react";
import { BsAirplane } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";

function page() {
  return (
    <div className=" bg-white min-h-screen">
      <div className="p-10 ">
        <div className=" border-2 border-gray-200 p-2 rounded-lg">
          <div className="flex justify-between p-2 rounded-lg items-center  border-b-2 mb-5 border-gray-200 ">
            <div>
              <h1 className="font-medium"> Available Balance </h1>
              <h1 className="font-bold">₹ 60,000 </h1>
            </div>
            <div>
              <Button>Set Now</Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <GoalCard />
            <GoalCard />
            <GoalCard />
            <GoalCard />
            <GoalCard />
            <GoalCard />
            <GoalCard />
            <GoalCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

const GoalCard = () => {
  return (
    <div className="w-[350px] rounded-lg  bg-white font-sans font-semibold  min-h-[250px] border-2 border-gray-200">
      <div className="p-2 flex flex-col gap-2">
        <div className="flex justify-between items-center ">
          <div className="flex gap-2 items-center">
            <BsAirplane />
            <h1>Vacation</h1>
          </div>
          <div>
            <SlOptionsVertical />
          </div>
        </div>
        <div className="mt-3">₹ 1,000</div>
        <ProgressBar progress={20} />
        <div className="flex  justify-between">
          <div className="flex gap-2">
            <h1>₹ 1,450</h1> <div className="text-gray-500">saved so far</div>
          </div>
          <div>20%</div>
        </div>
        <hr></hr>
        <div className="flex justify-between">
          <div className="text-gray-500">Target :</div>
          <div>₹ 10,000</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-500">Remaining :</div>
          <div>₹ 9,000</div>
        </div>
      </div>
      <div className="bg-gray-200 h-12 flex items-center pl-2">Auto save</div>
    </div>
  );
};

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
