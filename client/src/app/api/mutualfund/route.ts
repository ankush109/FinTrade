import { NextResponse } from "next/server";

const KUVERA_API_URL = "https://api.kuvera.in/mf/api/v4/fund_schemes/list.json";
const MAX_CATEGORIES = 1; // Limit to 3 categories
const MAX_FUNDS_PER_CATEGORY = 3; // Limit to 3 funds per category
const MAX_EQUITY_SUB_CATEGORIES = 4; // Limit to 4 sub-categories under Equity

// Define the type for each mutual fund
type Fund = {
  c: string; // Scheme Code
  n: string; // Fund Name
  re: string; // Reinvestment Option
  v: number; // NAV
  kc: string; // Category
};

export async function GET() {
  try {
    const response = await fetch(KUVERA_API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch mutual fund data");
    }

    const data = await response.json();
    // console.log("Full Response:", data); // Log the full response for debugging

    // Extract only 3 categories
    const selectedCategories = Object.keys(data).slice(0, MAX_CATEGORIES); // Get only the first 3 categories
    const importantData = selectedCategories.reduce((acc, category) => {
      acc[category] = {};

      // Handle the 'Equity' category separately for limiting its sub-categories to 4
      if (category === "Equity") {
        const equitySubCategories = Object.keys(data[category]).slice(
          0,
          MAX_EQUITY_SUB_CATEGORIES
        ); // Get only the first 4 sub-categories
        equitySubCategories.forEach((subCategory) => {
          const fundManagers = data[category][subCategory];

          // Ensure fundManagers is an array before using map
          if (Array.isArray(fundManagers)) {
            acc[category][subCategory] = fundManagers
              .slice(0, MAX_FUNDS_PER_CATEGORY) // Limit to 3 funds per sub-category
              .map((fund: Fund) => ({
                c: fund.c, // Scheme Code
                n: fund.n, // Fund Name
                re: fund.re, // Reinvestment Option
                v: fund.v, // NAV
                kc: fund.kc, // Category
              }));
          } else {
            // If it's not an array, handle it differently
            acc[category][subCategory] = [];
            if (typeof fundManagers === "object") {
              const fundManagerList = Object.values(fundManagers).flat();
              acc[category][subCategory] = fundManagerList
                .slice(0, MAX_FUNDS_PER_CATEGORY)
                .map((fund: Fund) => ({
                  c: fund.c,
                  n: fund.n,
                  re: fund.re,
                  v: fund.v,
                  kc: fund.kc,
                }));
            }
          }
        });
      } else {
        // For other categories, simply get the first 3 sub-categories and their funds
        for (const fundType in data[category]) {
          const fundManagers = data[category][fundType];

          // Ensure fundManagers is an array before using map
          if (Array.isArray(fundManagers)) {
            acc[category][fundType] = fundManagers
              .slice(0, MAX_FUNDS_PER_CATEGORY) // Limit to 3 funds per category
              .map((fund: Fund) => ({
                c: fund.c,
                n: fund.n,
                re: fund.re,
                v: fund.v,
                kc: fund.kc,
              }));
          } else {
            // If it's not an array, handle it differently
            acc[category][fundType] = [];
            if (typeof fundManagers === "object") {
              const fundManagerList = Object.values(fundManagers).flat();
              acc[category][fundType] = fundManagerList
                .slice(0, MAX_FUNDS_PER_CATEGORY)
                .map((fund: Fund) => ({
                  c: fund.c,
                  n: fund.n,
                  re: fund.re,
                  v: fund.v,
                  kc: fund.kc,
                }));
            }
          }
        }
      }

      return acc;
    }, {});

    return NextResponse.json(importantData);
  } catch (error) {
    console.error("Error fetching mutual fund data:", error);
    return NextResponse.json(
      { error: "Error fetching mutual fund data" },
      { status: 500 }
    );
  }
}
