import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GetUserQuery } from "@/api/user";
import { CiMail } from "react-icons/ci";

function DashboardNav() {
  const user = GetUserQuery();
  return (
    <div className="flex justify-between bg-white p-3 gap-5">
      <div className="text-2xl font-semibold">
        <h1> Dashboard</h1>
        <div className="">
          <h1 className="text-xl text-[#8e67e9] font-bold bg">
            Hi, {user?.data?.name}
          </h1>
        </div>
      </div>

      <div className="flex gap-5 items-center ">
        <IoIosNotifications size={25} />
        <CiMail size={25} />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default DashboardNav;
