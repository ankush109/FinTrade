"use client";
import React, { useEffect, useState } from "react";

const MutualFundCategories = () => {
  const [fundsData, setFundsData] = useState<any>(null);

  useEffect(() => {
    const fetchMutualFunds = async () => {
      try {
        const response = await fetch("/api/mutualfund"); // Adjust the path if needed
        const data = await response.json();
        setFundsData(data);
      } catch (error) {
        console.error("Error fetching mutual fund data:", error);
      }
    };

    fetchMutualFunds();
  }, []);

  if (!fundsData) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Mutual Funds
        </h1>
        {Object.keys(fundsData).map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(fundsData[category]).map((fundType) => (
                <div
                  key={fundType}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">
                    {fundType}
                  </h3>
                  <ul className="space-y-3">
                    {fundsData[category][fundType].map((fund: any) => (
                      <li
                        key={fund.c}
                        className="flex flex-col p-3 bg-gray-50 rounded-lg shadow-sm"
                      >
                        <span className="font-bold text-gray-800">
                          {fund.n}
                        </span>
                        <span className="text-sm text-gray-600">
                          NAV: <strong>{fund.v}</strong>
                        </span>
                        <span className="text-sm text-gray-600">
                          Reinvestment Option: <strong>{fund.re}</strong>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MutualFundCategories;
