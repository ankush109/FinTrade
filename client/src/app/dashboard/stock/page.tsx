"use client";
import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Sidebar from "../_components/sidebar";

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
  "BHARTIARTL.NS",
  "LT.NS",
  "MARUTI.NS",
  "SUNPHARMA.NS",
  "ADANIPORTS.NS",
  "ULTRACEMCO.NS",
  "ASIANPAINT.NS",
  "KOTAKBANK.NS",
  "ONGC.NS",
  "POWERGRID.NS",
];

const StockTracker = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/stock?symbols=${STOCKS.join(",")}`);
        const data = await response.json();
        setStockData(data);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
    const interval = setInterval(fetchStocks, 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <div className="pt-10 m-5">
          {loading ? (
            <p className="text-center text-lg">Loading stock data...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {stockData.map((stock, index) => (
                <div
                  key={index}
                  className={`relative p-4 border rounded shadow-md bg-white ${
                    stock.change >= 0 ? "border-green-500" : "border-red-500"
                  }`}
                >
                  {/* Top-right arrow */}
                  <div
                    className={`absolute top-2 right-2 ${
                      stock.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <div className="flex items-center">
                      <div>
                        {stock.change >= 0 ? (
                          <FaArrowUp className="mr-1" />
                        ) : (
                          <FaArrowDown className="mr-1" />
                        )}
                      </div>
                      <div>
                        ₹{stock.change.toFixed(2)} (
                        {stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>

                  {/* Stock Content */}
                  <h2 className="text-xl font-semibold">
                    {stock.name || stock.symbol}
                  </h2>
                  {stock.error ? (
                    <p className="text-red-500">{stock.error}</p>
                  ) : (
                    <div>
                      <p className="text-lg font-medium">₹{stock.price}</p>
                      <p className="text-sm text-gray-600">
                        High: ₹{stock.high} | Low: ₹{stock.low}
                      </p>
                      <p
                        className={`flex items-center text-sm font-medium ${
                          stock.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {/* {stock.change >= 0 ? (
                      <FaArrowUp className="mr-1" />
                    ) : (
                      <FaArrowDown className="mr-1" />
                    )}
                    ₹{stock.change} ({stock.changePercent}%) */}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StockTracker;
