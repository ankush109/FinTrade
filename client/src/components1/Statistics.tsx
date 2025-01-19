import React from "react";

const Statistics: React.FC = () => {
  return (
    <div className="flex flex-row justify-center px-16 pb-8">
      <div className="flex flex-col p-6 w-[70%]  rounded-xl shadow-lg">
        <div>
          <div className="text-2xl   text-gray-900 ">Order Book</div>
          <div className="flex flex-row justify-between px-6 my-6">
            <div className="w-[40%]">
              <div className="flex flex-row justify-between space-x-3 text-lg text-gray-400">
                <div>Price(USDT)</div>
                <div>Size(BTC)</div>
                <div>Sum(USDT)</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute left-0 bg-green-200 w-[40%] h-full rounded-r-md "></div>
                <div className="relative z-2 text-green-600">65,100</div>

                <div className="relative z-2">15.00</div>
                <div className="relative z-2">13.06M</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute left-0 bg-green-200 w-[50%] h-full rounded-r-md "></div>
                <div className="relative z-2 text-green-600">65,110</div>

                <div className="relative z-2">250.0</div>
                <div className="relative z-2">140.12M</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute left-0 bg-green-200 w-[30%] h-full rounded-r-md "></div>
                <div className="relative z-2 text-green-600">65,090</div>

                <div className="relative z-2">120.0</div>
                <div className="relative z-2">110.06M</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute left-0 bg-green-200 w-[55%] h-full rounded-r-md "></div>
                <div className="relative z-2 text-green-600">65,080</div>

                <div className="relative z-2">17.0</div>
                <div className="relative z-2">180.11K</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute left-0 bg-green-200 w-[45%] h-full rounded-r-md "></div>
                <div className="relative z-2 text-green-600">65,150</div>

                <div className="relative z-2">7.00</div>
                <div className="relative z-2">150.06K</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute left-0 bg-green-200 w-[60%] h-full rounded-r-md "></div>
                <div className="relative z-2 text-green-600">65,120</div>

                <div className="relative z-2">18.00</div>
                <div className="relative z-2">45.35M</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute left-0 bg-green-200 w-[35%] h-full rounded-r-md "></div>
                <div className="relative z-2 text-green-600">65,110</div>

                <div className="relative z-2">8.00</div>
                <div className="relative z-2">840.24K</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute left-0 bg-green-200 w-[60%] h-full rounded-r-md "></div>
                <div className="relative z-2 text-green-600">65,080</div>

                <div className="relative z-2">240.0</div>
                <div className="relative z-2">210.78M</div>
              </div>
            </div>
            <div className="border-l-2 border-gray-500"></div>
            <div className="w-[40%] ">
              <div className="flex flex-row justify-between space-x-3 text-lg text-gray-400">
                <div>Sum(USDT)</div>
                <div>Size(BTC)</div>
                <div>Price(USDT)</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute right-0 bg-red-200 w-[40%] h-full rounded-l-md "></div>
                <div className="relative z-2">13.06M</div>
                <div className="relative z-2">15.00</div>

                <div className="relative z-2 text-red-600">65,100</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute right-0 bg-red-200 w-[50%] h-full rounded-l-md "></div>

                <div className="relative z-2">140.12M</div>
                <div className="relative z-2">250.0</div>
                <div className="relative z-2 text-red-600">65,110</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute right-0 bg-red-200 w-[30%] h-full rounded-l-md "></div>
                <div className="relative z-2">110.06M</div>

                <div className="relative z-2">120.0</div>
                <div className="relative z-2 text-red-600">65,090</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute right-0 bg-red-200 w-[55%] h-full rounded-l-md "></div>
                <div className="relative z-2">180.11K</div>
                <div className="relative z-2">17.0</div>

                <div className="relative z-2 text-red-600">65,080</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute right-0 bg-red-200 w-[45%] h-full rounded-l-md "></div>
                <div className="relative z-2">150.06K</div>
                <div className="relative z-2">7.00</div>

                <div className="relative z-2 text-red-600">65,150</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute right-0 bg-red-200 w-[60%] h-full rounded-l-md "></div>
                <div className="relative z-2">45.35M</div>
                <div className="relative z-2">18.00</div>

                <div className="relative z-2 text-red-600">65,120</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute right-0 bg-red-200 w-[35%] h-full rounded-l-md "></div>
                <div className="relative z-2">840.24K</div>

                <div className="relative z-2">8.00</div>
                <div className="relative z-2 text-red-600">65,110</div>
              </div>
              <div className="flex flex-row justify-around mt-2 space-x-3  text-gray-900 text-center relative">
                <div className="absolute right-0 bg-red-200 w-[60%] h-full rounded-l-md "></div>
                <div className="relative z-2">210.78M</div>
                <div className="relative z-2">240.0</div>

                <div className="relative z-2 text-red-600">65,080</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
