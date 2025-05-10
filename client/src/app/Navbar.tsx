import { Button } from "@/components/ui/button";
import React from "react";

import Link from "next/link";
import { GetUserQuery } from "@/api/query/useGetUserDetails";
function Navbar() {
  const user = GetUserQuery();

  return (
    <div className="max-w-7xl flex justify-between items-center mx-auto px-5 py-5">
      <div className="text-2xl font-bold ">
        <Link href="/">
          <span style={{ color: "blue" }}>Fin</span>
          <span style={{ color: "black" }}>Trade</span>
        </Link>
      </div>
      <div className="flex  text-md text-gray-700 gap-4 ml-10">
        <Link href="/consult">
          <div>Home</div>
        </Link>
        {user?.data && (
          <Link href="/dashboard">
            <div>Dashboard</div>
          </Link>
        )}
        <Link href="/about">
          <div>Services</div>
        </Link>
        <Link href="/about">
          <div>Contact</div>
        </Link>
      </div>

      {user?.data ? (
        <div className="flex font-semibold items-center gap-10">
          {" Hello, " + user?.data?.name}
          <Link href="/login">
            <Button
              className="bg-black"
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
          <Button className="bg-black">Login</Button>
        </Link>
      )}
      {/* <button className="bg-black w-[100px] text-sm  text-white p-3 rounded-lg">
        Sign In
      </button> */}
      {/* <div className="flex gap-20 mr-10">
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
      </div> */}
    </div>
  );
}

export default Navbar;
