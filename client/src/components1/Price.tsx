import React, { useState, useEffect } from "react";

import Loader from "./Loader";
import { useStockData } from "@/api/query/useGetStockDataQuery";

const Price: React.FC = () => {
  const [price, setPrice] = useState<number>(63179.71);
  const [percentageChange, setPercentageChange] = useState<number>(3.54);

  const { data: stockData = [], isLoading } = useStockData("1d");

  useEffect(() => {
    if (stockData.length > 1) {
      const latestPrice = stockData[stockData.length - 1].close;
      const previousPrice = stockData[stockData.length - 2].close;

      setPrice(latestPrice);
      const dailyChange = ((latestPrice - previousPrice) / previousPrice) * 100;
      setPercentageChange(dailyChange);
    }
  }, [stockData]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  return (
    <div>
      <section className="mb-6">
        <div>
          {isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <div>
              <div className="flex items-start space-x-2">
                <div className="text-[70px] font-normal leading-[88px] text-left text-[#1A243A]">
                  {formatPrice(price)}
                </div>
                <div className="text-[24px] font-normal text-[#BDBEBF] mt-3">
                  USD
                </div>
              </div>

              <div
                className={`text-lg ${
                  percentageChange > 0 ? "text-[#67BF6B]" : "text-[#E94B3C]"
                } text-[18px] leading-[22.77px]`}
              >
                {percentageChange >= 0 ? "+" : "-"}
                {formatPrice(price - stockData[stockData.length - 2]?.close)} (
                {percentageChange.toFixed(2)}%)
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Price;
