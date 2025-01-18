// @ts-nocheck
import { fetchMyEvents, registerEvent } from "@/api/ngo";
import { Avatar, AvatarGroup } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Globe, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
interface eventCardProps {
  id: String;
  name: String;
  description: String;
  funding: Number;
  location: String;
  startDate: String;
  // d_option: Boolean;
}
const MyEvent: FC<eventCardProps> = ({
  id,
  name,
  description,
  funding,
  location,
  startDate,
  // d_option,
}) => {
  console.log(startDate && startDate[0], "st");
  const handleJoinEvent = async () => {
    try {
      const data = registerEvent(id);
      toast.success("You are successfully registered for the event");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-grey-300 h-25 flex flex-col  shadow-lg rounded-lg  transition ease-in hover:-translate-y-1">
      <div className="bg-gery-300 h-full flex items-center justify-center ">
        <Image
          height={50}
          width={300}
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhuZMsc_-2l-WqV3xpCTHqi76yBY3qmK4FAQ&s"
          src="https://static.vecteezy.com/system/resources/thumbnails/012/919/709/small_2x/ngo-or-non-governmental-organization-to-serve-specific-social-and-political-needs-in-template-hand-drawn-cartoon-flat-illustration-vector.jpg"
          alt=""
        />
      </div>
      <div className=" flex justify-center flex-col  ">
        <div className="px-3  gap-2  text-center text-xl font-semibold">
          <span className="font-lg  "> {name}</span>
        </div>
        <div className=" gap-2  text-gray-500  text-center p-2 text-xs font-semibold">
          <span className="font-sm"> {description}</span>
        </div>

        <div className="flex justify-between p-4 items-center">
          <div className="px-3 mt-2 gap-2 text-sm font-semibold">
            <p>
              <span className="font-sm flex items-center gap-2 ">
                <Globe className="w-5" />
                {location}
              </span>
            </p>
            <p className="flex  gap-2 items-center">
              <TimerIcon />

              <span className="font-sm">
                {" "}
                {startDate && startDate[0]?.date.substr(0, 10)}
              </span>
            </p>
          </div>
          <div>
            <AvatarGroup max={4} className="text-green-400">
              <Avatar
                style={{
                  backgroundColor: "green",
                }}
                sx={{ width: "1.4vmax", height: "1.4vmax", fontSize: "1vmax" }}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
              <Avatar
                style={{
                  backgroundColor: "green",
                }}
                sx={{ width: "1.4vmax", height: "1.4vmax", fontSize: "1vmax" }}
                alt="Travis Howard"
                src="/static/images/avatar/2.jpg"
              />
              <Avatar
                style={{
                  backgroundColor: "green",
                }}
                sx={{ width: "1.4vmax", height: "1.4vmax", fontSize: "1vmax" }}
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
              />
              <Avatar
                style={{
                  backgroundColor: "green",
                }}
                sx={{ width: "1vmax", height: "1vmax" }}
                alt="Agnes Walker"
                src="/static/images/avatar/4.jpg"
              />
              <Avatar
                style={{
                  backgroundColor: "green",
                }}
                sx={{ width: "1.4vmax", height: "1.4vmax", fontSize: "1vmax" }}
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
            </AvatarGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvent;
