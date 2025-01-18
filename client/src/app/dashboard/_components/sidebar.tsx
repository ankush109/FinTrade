"use client";
import { fetchMyEvents, fetchevents } from "@/api/ngo";
import { GetUserQuery } from "@/api/user";
import { Tooltip } from "@mui/material";
import {
  Calendar,
  Home,
  LayoutDashboard,
  Settings,
  SquareMenu,
  BookOpenCheck,
  FilePlus,
  ReceiptText,
  MessageCircleIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "./Loader";
import Event from "../NGO/allEvents/components/Event";

function Sidebar() {
  const getUserDetails = GetUserQuery();
  const [events, setEvents] = useState([]);

  const [myevents, setMyEvents] = useState([]);
  const {
    isLoading: EventLoading,
    data: eventdata,
    isError: EventError,
  } = fetchevents();

  const {
    isLoading: MyEventLoading,
    data: myeventdata,
    isError: MyEventError,
  } = fetchMyEvents();

  useEffect(() => {
    if (!EventLoading) {
      setEvents(eventdata.message);
    }
    if (!MyEventLoading) {
      setMyEvents(myeventdata.message);
    }
  }, [EventLoading, MyEventLoading]);
  if (EventError || MyEventError) {
    return (
      <div>
        <div>Error Loading ...</div>
      </div>
    );
  }
  if (EventLoading || MyEventLoading) {
    return <Loading />;
  }
  // const checkExistence = (id) => {
  //   return myevents.some((ev) => ev.id === id);
  // };
  // const getUserDetails = GetUserQuery();
  return (
    <div className="flex">
      <div className="flex flex-col gap-10 p-5 h-screen bg-stone-900">
        <Tooltip title="Dashboard">
          {getUserDetails?.data?.role !== "Mentor" ? (
            <>
              <Link href="/dashboard">
                <LayoutDashboard className="text-white" />
              </Link>
            </>
          ) : (
            <Link href="/dashboard/mentor-meetings">
              <LayoutDashboard className="text-white" />
            </Link>
          )}
        </Tooltip>
        <Tooltip title="Home">
          <Link href="/">
            <Home className="text-white" />
          </Link>
        </Tooltip>
        <Tooltip title="Calender">
          <Link href="/dashboard/faq">
            <MessageCircleIcon className="text-white" />
          </Link>
        </Tooltip>
        <Tooltip title="Meetings">
          {getUserDetails?.data?.role === "Mentor" ? (
            <Link href="/dashboard/mentor-meetings">
              {" "}
              <SquareMenu className="text-white" />
            </Link>
          ) : (
            <Link href="/dashboard/meeting">
              {" "}
              <SquareMenu className="text-white" />
            </Link>
          )}
        </Tooltip>
        {getUserDetails?.data?.role === "User" ? (
          <>
            <Tooltip title="My Tasks">
              <Link href="/dashboard/dailytask" className="text-white">
                <BookOpenCheck className="text-white" />
              </Link>
            </Tooltip>
            <Tooltip title="create NGO evets">
              <Link href="/dashboard/NGO/createEvent" className="text-white">
                <FilePlus className="text-white" />
              </Link>
            </Tooltip>
          </>
        ) : (
          <></>
        )}
        <Tooltip title="all NGO evets">
          <Link href="/dashboard/NGO/allEvents" className="text-white">
            <ReceiptText className="text-white" />
          </Link>
        </Tooltip>
        <Tooltip title="Settings">
          <Settings className="text-white" />
        </Tooltip>
      </div>
      <div className=" min-w-[400px] h-screen overflow-hidden mx-auto flex flex-col  items-center bg-slate-200">
        <div className="primary-container mt-4 ">
          <div className="text-center font-serif text-4xl">All Ngo Events</div>

          <div className="grid grid-cols-1 p-4 items-center justify-center gap-10">
            {events?.length > 0 ? (
              events.slice(-2).map((ev: any) => (
                <Event
                  key={ev.id}
                  id={ev.id}
                  name={ev.name!}
                  description={ev?.description!}
                  funding={ev.funding!}
                  location={ev.location!}
                  startDate={
                    ev.date && ev.date[0] && ev.date[0].date.substr(0, 10)!
                  }
                  // d_option={checkExistence(ev.id)}
                />
              ))
            ) : (
              <div>No events to display</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
