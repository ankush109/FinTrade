import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const timeframeMapping: { [key: string]: string } = {
  "1m": "1m",
  "5m": "5m",
  "1h": "1h",
  "1d": "1d",
  "1w": "1w",
  "1M": "1M",
  "max": "1M",
};


const fetchStockData = async (timeframe: string) => {
  const response = await axios.get("https://api.binance.com/api/v3/klines", {
    params: {
      symbol: "BTCUSDT", 
      interval: timeframeMapping[timeframe],
      limit: 1000, 
    },
  });



return response.data.map((res: any) => ({
    time: res[0] / 1000, // Convert timestamp to seconds
    open: parseFloat(res[1]), // Open price
    high: parseFloat(res[2]), // High price
    low: parseFloat(res[3]), // Low price
    close: parseFloat(res[4]), // Close price
    volume: parseFloat(res[5]), // Volume
    quoteVolume: parseFloat(res[7]), // Quote asset volume
    numTrades: res[8], // Number of trades
    takerBuyBaseVolume: parseFloat(res[9]), // Taker buy base asset volume
    takerBuyQuoteVolume: parseFloat(res[10]), // Taker buy quote asset volume
  }));
}

export const useStockData = (timeframe: string) => {
  return useQuery({
    queryKey: ["stockData", timeframe],
    queryFn: () => fetchStockData(timeframe),
    refetchInterval:500, 
  });
};
