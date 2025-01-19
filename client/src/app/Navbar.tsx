import { Button } from "@/components/ui/button";
import React from "react";
import { GetUserQuery } from "../api/user/index";
import Link from "next/link";
function Navbar() {
  const user = GetUserQuery();

  return (
    <div className="max-w-7xl mx-auto z-10  p-4 mt-5 bg-[white] rounded-full absolute top-0 left-0 right-0 shadow-2xl	  flex justify-between  items-center shadow-[#3D6ABB1C]">
      <div className="text-2xl font-bold flex gap-10 justify-center items-center">
        <Link href="/">
          <span style={{ color: "blue" }}>Fin</span>
          <span style={{ color: "black" }}>Trade</span>
        </Link>
        <div className="text-xl font-medium">
          <div className="flex gap-5">
            {user?.data?.role !== "Mentor" ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <Link href="/dashboard/mentor-meetings">Dashboard</Link>
            )}
            {user.data?.role === "Mentor" ? (
              <Link href="/dashboard/mentor-meetings">Dashboard</Link>
            ) : (
              <></>
            )}
            <Link href="/dashboard/faq">Discussion Forum</Link>
            <Link href="/dashboard/meet">Meetings</Link>
          
          
          </div>
        </div>
      </div>
      <div className="flex gap-20 mr-10">
        {user?.data ? (
          <div className="flex font-semibold items-center gap-10">
            {" Hello, " + user?.data?.name}
            <Link href="/login">
              <Button
                className="bg-blue-600"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </Button>
            </Link>
          </div>
        ) : (
          <Link href="/login">
            <Button className="bg-blue-600">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
