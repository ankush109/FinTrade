"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import processData from "../data/ProcessData";

function SectionProcess() {
  const [isDesktop, setIsDesktop] = useState(false);

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="lg:p-20 pb-10 pt-5 mt-20 bg-[#F8F9FD]">
      <div className="text-center flex mt-10  flex-col gap-5">
        <div className="font-bold text-4xl text-[#00173C]">Our Process</div>
        <div className="text-[#576A8A]">
          Streamlined Process for Mental Health Improvement
        </div>
      </div>
      {isDesktop ? <DesktopProcess /> : <MobileProcess />}
    </div>
  );
}

export default SectionProcess;

const DesktopProcess = () => {
  const [activeSection, setActiveSection] = useState(1);

  const handleScroll = () => {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setActiveSection(index + 1);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {processData.map((process, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className={`section grid grid-cols-3 max-w-7xl mx-auto mt-20 ${
              activeSection === index + 1 ? "text-[#00173C]" : "text-[#AFB8C9]"
            }`}
          >
            {isEven ? (
              <>
                <div className="">
                  <Image
                    src={process.imageUrl}
                    className="rounded-3xl"
                    alt=""
                    width={300}
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`text-6xl ${
                      activeSection === index + 1
                        ? "text-[#00173C]"
                        : "text-[#AFB8C9]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <span
                    className={`w-[4px] h-full ${
                      activeSection === index + 1
                        ? "bg-blue-400"
                        : "bg-[#AFB8C9]"
                    }`}
                  ></span>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="font-bold text-3xl">{process.title}</div>
                  <div className="text-[#576A8A]">{process.description}</div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-5">
                  <div className="font-bold text-3xl">{process.title}</div>
                  <div className="text-[#576A8A]">{process.description}</div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`text-6xl ${
                      activeSection === index + 1
                        ? "text-[#00173C]"
                        : "text-[#AFB8C9]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <span
                    className={`w-[4px] h-full ${
                      activeSection === index + 1
                        ? "bg-blue-400"
                        : "bg-[#AFB8C9]"
                    }`}
                  ></span>
                </div>
                <div className="">
                  <Image
                    src={process.imageUrl}
                    className="rounded-3xl"
                    alt=""
                    width={300}
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

const MobileProcess = () => {
  const [activeSection, setActiveSection] = useState(1);

  const handleScroll = () => {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setActiveSection(index + 1);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-[90%] mx-auto ">
      {processData.map((process, index) => {
        return (
          <div
            key={index}
            className={`section flex mt-20 gap-5 ${
              activeSection === index + 1 ? "text-[#00173C]" : "text-[#AFB8C9]"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className={`text-6xl ${
                  activeSection === index + 1
                    ? "text-[#00173C]"
                    : "text-[#AFB8C9]"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <span
                className={`w-[4px] h-full ${
                  activeSection === index + 1 ? "bg-blue-400" : "bg-[#AFB8C9]"
                }`}
              ></span>
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <div className="font-bold text-3xl">{process.title}</div>
                <div className="text-[#576A8A]">{process.description}</div>
              </div>
              <div className="">
                <Image src={process.imageUrl} className="rounded-3xl" alt="" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
