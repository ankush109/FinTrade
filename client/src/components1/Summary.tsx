import { useStockData } from "../hooks/useStockData";
import Loader from "./Loader";

const Summary: React.FC = () => {
  interface StockDataPoint {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    quoteVolume: number;
    numTrades: number;
    takerBuyBaseVolume: number;
    takerBuyQuoteVolume: number;
  }

  const { data: stockData = [], isLoading } = useStockData("1d");

  const currentPrice = stockData[stockData.length - 1]?.close;
  const price24hHigh = Math.max(
    ...stockData.map((item: StockDataPoint) => item.high)
  );
  const price24hLow = Math.min(
    ...stockData.map((item: StockDataPoint) => item.low)
  );

  const priceChange =
    ((currentPrice - stockData[0]?.close) / stockData[0]?.close) * 100;

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };
  if (isLoading) {
    return (
      <div className="flex flex-row justify-center m-4">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-row justify-between px-16">
      <div className=" flex flex-col text-center pt-8 w-[350px] h-[200px] rounded-md shadow-md ">
        <div className="text-lg text-gray-500 font-normal">Current Price</div>
        <div className="text-4xl text-gray-600 mt-6 font-semibold">
          {formatPrice(currentPrice)}
        </div>
      </div>
      <div className=" flex flex-col text-center pt-8 w-[350px] h-[200px] rounded-md shadow-md relative ">
        <div className="flex flex-col justify-center  h-[32px] w-[32px] rounded-full bg-[#4B40EE]  text-gray-50 absolute top-1 right-1 font-semibold">
          5y
        </div>
        <div className="text-lg text-gray-500 font-normal">Change</div>
        <div className="text-3xl text-gray-600 mt-6 font-semibold">
          {priceChange.toFixed(2)}%
        </div>
      </div>
      <div className=" flex flex-col text-center pt-8 w-[350px] h-[200px] rounded-md shadow-md relative">
        <div className="flex flex-col justify-center  h-[32px] w-[32px] rounded-full bg-[#4B40EE]  text-gray-50 absolute top-1 right-1 font-semibold ">
          5y
        </div>
        <div className="text-lg text-gray-500 font-normal">High/Low</div>
        <div className="text-3xl text-gray-600 mt-6 font-semibold">
          {formatPrice(price24hHigh)} / {formatPrice(price24hLow)}
        </div>
      </div>
    </div>
  );
};

export default Summary;
