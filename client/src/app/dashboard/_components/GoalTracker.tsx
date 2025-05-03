"use client";

import React, { useEffect, useState } from "react";
import { CircularProgressBar } from "react-percentage-bar";
import { getmygoals } from "@/api/goals";

function GoalTracker() {
  const { data } = getmygoals();
  const [shortammount, setshortammount] = useState(0);
  const [longammount, setlongammount] = useState(0);
  const [short, setshort] = useState(0);
  const [long, setlong] = useState(0);

  useEffect(() => {
    const shorterm = data?.message.filter((x) => x.type === "SHORT_TERM");
    const longterm = data?.message.filter((x) => x.type === "LONG_TERM");

    const shortAmountData = shorterm?.reduce((total, current) => {
      return total + (parseFloat(current.money) || 0);
    }, 0);

    const longAmountData = longterm?.reduce((total, current) => {
      return total + (parseFloat(current.money) || 0);
    }, 0);

    setshort(shorterm?.length);
    setlong(longterm?.length);
    setshortammount(shortAmountData);
    setlongammount(longAmountData);
  }, [data]);

  return (
    <div className="flex gap-4 p-3 bg-gray-50">
      <div className="bg-white flex p-5 border-2 border-gray-200 rounded-md shadow-md items-center w-1/2">
        <div>
          <CircularProgressBar
            size="0.4rem"
            radius="4rem"
            animation={false}
            roundLineCap={false}
            percentage={40}
            styles="solid"
            percentageAnimation={true}
          />
        </div>
        <div className="flex flex-col ml-4">
          <p className="text-lg font-semibold text-gray-700">
            Total number of goals: <span className="font-medium">{long}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Total Amount: <span className="font-medium">{longammount}</span>
          </p>
        </div>
      </div>

      <div className="bg-white flex p-5 border-2 border-gray-200 rounded-md shadow-md items-center w-1/2">
        <div>
          <CircularProgressBar
            size="0.4rem"
            radius="4rem"
            animation={false}
            roundLineCap={false}
            percentage={40}
            styles="solid"
            percentageAnimation={true}
          />
        </div>
        <div className="flex flex-col ml-4">
          <p className="text-lg font-semibold text-gray-700">
            Total number of goals: <span className="font-medium">{short}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Total Amount: <span className="font-medium">{shortammount}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GoalTracker;
