"use client"
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext"

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className="flex justify-center items-center w-10">
      <button
        onClick={toggleTheme}
        className="p-0.5 bg-[#696FFB] rounded-full transition-all duration-300"
      >
        <div className="relative w-9 h-5">
          <div
            className={`absolute w-[18px] h-[18px] top-[1px] bg-white rounded-full transition-all duration-300 z-10 ${
              isDarkMode ? "transform translate-x-[18px]" : ""
            }`}
          ></div>

          <FaMoon className="absolute right-[2px] top-1  text-yellow-300 transition-all duration-300 z-0 text-xs" />

          <FaSun className="absolute left-[2px] top-1  text-yellow-300 transition-all duration-300 z-0 text-xs" />
        </div>
      </button>
    </div>
  );
};

export default ThemeToggleButton;