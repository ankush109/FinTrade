"use client";
import React, { useEffect } from "react";
import { getmyassets } from "../../../api/goals/index";
import mutualfund from "../../../assets/funds.png"
import fd from "../../../assets/fds.png"
import stocks from "../../../assets/stocks.png"
import Image from "next/image";
function AssetData() {
  const myassets = getmyassets();

  useEffect(() => {
    console.log(myassets?.data?.message, "asset");
  }, [myassets]);

  const getImageForType = (type) => {
    const imageMap = {
      "Mutual Funds": mutualfund,
      "FD": fd,
      "Stocks": stocks,
    };
    return imageMap[type] || ""; // Return an empty string if type is not found
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Assets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myassets?.data?.message?.map((asset) => (
          <div
            key={asset.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6"
          >
           <div className="flex item-end w-full justify-end">
           <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 ">
            <span className="font-medium border-2 border-gray-300 p-1 bg-[#B8E9D4]   ">{asset.type}</span>
            </p>
            </div>
            <h2 className="text-lg  font-semibold text-gray-700 dark:text-white mb-2">
              <div className="">{asset.name.toUpperCase()}</div>
            </h2>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 ">
           <span className="font-medium text-xl">₹{asset.ammount}</span>
            </p>
           
            <Image src={getImageForType(asset.type)} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssetData;
