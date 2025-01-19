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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Mutual Funds</h1>
      {Object.keys(fundsData).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          {Object.keys(fundsData[category]).map((fundType) => (
            <div key={fundType}>
              <h3>{fundType}</h3>
              <ul>
                {fundsData[category][fundType].map((fund: any) => (
                  <li key={fund.c}>
                    <strong>{fund.n}</strong> - NAV: {fund.v} - Reinvestment
                    Option: {fund.re}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MutualFundCategories;
