"use client";
import React, { useEffect, useState } from "react";
import { getmyassets } from "../../../api/goals/index";
import mutualfund from "../../../assets/funds.png"
import fd from "../../../assets/fds.png"
import stocks from "../../../assets/stocks.png"
import Image from "next/image";
function AssetData() {
  const myassets = getmyassets();
  const [total,settotal]=useState(0)
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
 useEffect(()=>{
  const totalAssetval = myassets?.data?.message.reduce((acc,x)=>{
    return acc+=parseInt(x.ammount)
  },0)
  settotal(totalAssetval)
 },[myassets.data])
  return (
    <div className="p-4">
   <div className="bg-blue-50 text-blue-900 font-semibold text-lg p-4 rounded-md shadow-md flex items-center justify-center">
  Total Assets Worth 
  <span className="text-blue-600 font-bold ml-2">
    ₹ {total}
  </span>
  </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myassets?.data?.message?.map((asset) => (
          <div
            key={asset.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6"
          >
            <span className="mb-10 font-bold text-md">{asset.type}</span>
           <div className="flex ijustify-end">
           <p className="text-sm text-gray-600 dark:text-gray-300 mb-2  ">
           <Image src={getImageForType(asset.type)} alt="" />
            
            </p>
            </div>
            <h2 className="text-lg  font-semibold text-gray-700 dark:text-white mb-2">
              <div className="">{asset.name.toUpperCase()}</div>
            </h2>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 ">
           <span className="font-medium text-xl">₹{asset.ammount}</span>
            </p>
           
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssetData;
