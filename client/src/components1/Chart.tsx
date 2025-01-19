import React, { useEffect, useRef, useState, useCallback } from "react";
import { createChart, IChartApi } from "lightweight-charts";
import { MdOpenInFull } from "react-icons/md";
import { LuCircle } from "react-icons/lu";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useStockData } from "../hooks/useStockData";
import Loader from "./Loader";

const Chart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1d");
  const fullScreenHandle = useFullScreenHandle();

  const { data: stockData = [], isLoading } = useStockData(selectedTimeframe);
  interface StockDataPoint {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }

  const resizeChart = useCallback(() => {
    if (chartRef.current && chartContainerRef.current) {
      chartRef.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        grid: {
          vertLines: { color: "#ffffff", style: 1 },
          horzLines: { color: "#ffffff", style: 1 },
        },
        crosshair: {
          vertLine: { color: "#e1e4e8", width: 2 },
          horzLine: { color: "#e1e4e8", width: 2 },
        },
        layout: { textColor: "#000" },
      });

      const areaSeries = chartRef.current.addAreaSeries({
        topColor: "rgb(232 231 255)",
        bottomColor: "rgb(255 255 255)",
        lineColor: "#4B40EE",
        lineWidth: 2,
      });

      const volumeSeries = chartRef.current.addHistogramSeries({
        color: "#4B40EE",
        priceFormat: { type: "volume" },
      });

      volumeSeries.applyOptions({
        priceScaleId: "",
      });

      chartRef.current.priceScale("").applyOptions({
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });

      if (stockData.length > 0) {
        const mappedData = stockData.map((dataPoint: StockDataPoint) => ({
          time: dataPoint.time,
          value: dataPoint.close,
        }));
        const volumeData = stockData.map((dataPoint: StockDataPoint) => ({
          time: dataPoint.time,
          value: dataPoint.volume,
          color: dataPoint.close > dataPoint.open ? "#a9f7af" : "#fcb8b0",
          // color: "#E6E8EB",
        }));

        areaSeries.setData(mappedData);
        volumeSeries.setData(volumeData);
      }
    }

    window.addEventListener("resize", resizeChart);
    return () => {
      window.removeEventListener("resize", resizeChart);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [stockData, selectedTimeframe, resizeChart]);

  useEffect(() => {
    if (fullScreenHandle.active) {
      resizeChart();
    }
  }, [fullScreenHandle.active, resizeChart]);

  if (isLoading) {
    return (
      <div className="flex flex-row justify-center m-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-[90%] p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-8">
          <div
            className="flex flex-row justify-center cursor-pointer"
            onClick={fullScreenHandle.enter}
          >
            <div className="px-2 text-[#6F7177] text-[20px]">
              <MdOpenInFull />
            </div>
            <div className="text-[#6F7177] text-[18px] leading-[22.77px] font-normal hover:text-[#1A243A]">
              Fullscreen
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="px-2 text-[#6F7177] text-[20px]">
              <LuCircle />
            </div>
            <div className="text-[#6F7177] text-[18px] leading-[22.77px] font-normal hover:text-[#1A243A] cursor-pointer">
              Compare
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          {["1m", "5m", "1h", "1d", "1w", "1M", "max"].map((timeframe) => (
            <button
              key={timeframe}
              className={`text-[#6F7177] py-1 px-2 rounded-md text-[18px] leading-[22.77px] font-normal hover:text-[#ffffff] hover:bg-[#4B40EE] cursor-pointer ${
                selectedTimeframe === timeframe
                  ? "bg-[#4B40EE] text-[#ffffff]"
                  : ""
              }`}
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      <FullScreen handle={fullScreenHandle}>
        <div
          ref={chartContainerRef}
          className="overflow-hidden w-full h-full"
          style={{ minHeight: "400px" }}
        ></div>
      </FullScreen>
    </div>
  );
};

export default Chart;
