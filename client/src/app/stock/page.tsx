"use client";
import { useState, useEffect } from "react";

const STOCKS = [
  "RELIANCE.NS",
  "TCS.NS",
  "INFY.NS",
  "HDFCBANK.NS",
  "ICICIBANK.NS",
  "ITC.NS",
  "WIPRO.NS",
  "SBIN.NS",
  "BAJAJ-AUTO.NS",
  "HINDUNILVR.NS",
];

const StockTracker = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/stock?symbols=${STOCKS.join(",")}`);
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Indian Stock Tracker</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stockData.map((stock, index) => (
            <div key={index} className="p-4 border rounded shadow-md bg-white">
              <h2 className="text-lg font-semibold">
                {stock.name || stock.symbol}
              </h2>
              {stock.error ? (
                <p className="text-red-500">{stock.error}</p>
              ) : (
                <div>
                  <p>Price: ₹{stock.price}</p>
                  <p>High: ₹{stock.high}</p>
                  <p>Low: ₹{stock.low}</p>
                  <p>
                    Change: ₹{stock.change} ({stock.changePercent}%)
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockTracker;
