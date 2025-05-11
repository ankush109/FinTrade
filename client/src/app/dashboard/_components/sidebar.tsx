"use client";
import React from "react";
import { RiDashboardLine, RiShoppingBasketLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { FaTruckArrowRight } from "react-icons/fa6";
import finTradeLogo from "../../../assets/fintrade-logo.png";
import { MdOutlinePayment, MdOutlineSecurity } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { TbMessageShare, TbLogout2 } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GoGoal } from "react-icons/go";

import ThemeToggleButton from "./ThemeToggleButton";
import { useSidebar } from "../../../context/SidebarContext";
import Link from "next/link";
import Image from "next/image";

const SidebarItem = ({ href = "#", icon, label, isSidebarExpanded }) => {
  // Check if label is 'Stock Forecasting'
  const updatedHref = label === "Stock Forecasting" ? href : href;

  return (
    <Link href={updatedHref}>
      <li className="flex items-center justify-center  px-3">
        <div
          className={`hover:bg-[#696FFB3D] hover:cursor-pointer hover:text-[#696FFB] px-3 py-1 rounded-md flex flex-row space-x-2 ${
            isSidebarExpanded ? "justify-start w-full" : "justify-center"
          }`}
        >
          <span className="text-2xl">{icon}</span>
          {isSidebarExpanded && <span className="font-bold">{label}</span>}
        </div>
      </li>
    </Link>
  );
};

const Sidebar = () => {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();

  const firstSectionItems = [
    { icon: <RiDashboardLine />, label: "Dashboard", link: "/dashboard" },
    { icon: <MdOutlinePayment />, label: "Stock", link: "/dashboard/stock" },
    { icon: <GoPeople />, label: "meet", link: "/dashboard/meet" },
    { icon: <TbMessageShare />, label: "Discuss", link: "/dashboard/faq" },
  ];

  const secondSectionItems = [
    {
      icon: <RiShoppingBasketLine />,
      label: "Mutual Funds",
      link: "/dashboard/mutualfund",
    },
    { icon: <LiaFileInvoiceDollarSolid />, label: "Invoice", link: "/invoice" },
    {
      icon: <GoGoal />,
      label: "Goal",
      link: "/dashboard/goal",
    },
  ];

  const thirdSectionItems = [
    { icon: <IoSettingsOutline />, label: "Settings", link: "/settings" },
  ];

  return (
    <div>
      <div className="hidden lg:flex bg-gray-200  flex-col gap-10 py-4 space-y-4 border-r border-[#00000029] dark:border-[#FFFFFF29] h-screen dark:bg-[#545469] shadow-lg">
        <button
          // onClick={toggleSidebar}
          className="text-black dark:text-white w-full flex  justify-start"
        >
          <Link href="/" className="text-2xl pl-3 pr-3 bg-white rounded-lg">
            {/* <Link href="/" className="text-blue-400 font-semibold">
              Fin
            </Link>
            Trade */}
            <Image src={finTradeLogo} alt="" height={100} width={150} />
          </Link>
        </button>

        <div className="w-full mt-8 flex flex-col ">
          {/* First Section */}
          <ul className="flex flex-col gap-2 space-y-2 text-gray-600 dark:text-white border-[#00000029] dark:border-[#FFFFFF29] pb-2">
            {firstSectionItems.map((item, index) => (
              <SidebarItem
                href={item.link || "#"}
                key={index}
                icon={item.icon}
                label={item.label}
                isSidebarExpanded={isSidebarExpanded}
              />
            ))}
          </ul>

          {/* Second Section */}
          <ul className="flex flex-col gap-2   space-y-2 text-gray-600 dark:text-white  border-[#00000029] dark:border-[#FFFFFF29] pb-2 pt-2">
            {secondSectionItems.map((item, index) => (
              <SidebarItem
                href={item.link || "#"}
                key={index}
                icon={item.icon}
                label={item.label}
                isSidebarExpanded={isSidebarExpanded}
              />
            ))}
          </ul>

          {/* Third Section */}
          <ul className="flex flex-col  gap-2  space-y-2 text-gray-600 dark:text-white  border-[#00000029] dark:border-[#FFFFFF29] pb-2 pt-2">
            {thirdSectionItems.map((item, index) => (
              <SidebarItem
                href={item.link || "#"}
                key={index}
                icon={item.icon}
                label={item.label}
                isSidebarExpanded={isSidebarExpanded}
              />
            ))}
          </ul>

          {!isSidebarExpanded ? (
            <div className="flex justify-center items-center fixed bottom-0 py-1 px-3">
              <ThemeToggleButton />
            </div>
          ) : (
            <div className="flex justify-center items-center fixed bottom-0 py-1 px-3">
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-white">
                <span className="m-2">Light</span>
                <ThemeToggleButton />
                <span className="m-2">Dark</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
