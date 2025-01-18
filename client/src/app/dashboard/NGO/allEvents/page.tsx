"use client";
import React, { useEffect, useState } from "react";
// import ConsultantCard from "../../_components/ConsultantCard";
import Event from "./components/Event";
import { fetchMyEvents, fetchevents } from "@/api/ngo";
import Loading from "../../_components/Loader";
import { GetUserQuery } from "@/api/user";
import MyEvent from "./components/Myevent";

function page() {
  const [events, setEvents] = useState([]);
  const {
    isLoading: EventLoading,
    data: eventdata,
    isError: EventError,
  } = GetUserQuery();
  useEffect(() => {
    if (!EventLoading) {
      console.log("first", eventdata);
      setEvents(eventdata.registeredEvents);
    }
  }, [EventLoading]);
  // const checkExistance = (id) => {
  //   return events.some((ev) => ev.id === id);
  // };
  if (EventError) {
    return (
      <div>
        <div>Error Loading ...</div>
      </div>
    );
  }
  if (EventLoading) {
    return <Loading />;
  }
  //date[0].date.substr(0,10)
  // console.log(date[0].date);
  return (
    <>
      <div className="primary-container mt-4 ">
        <div className="text-center font-serif text-4xl">Registered Events</div>
        <hr className="my-5" />
        <div className="grid grid-cols-2 p-4 gap-10">
          {events?.length > 0 ? (
            events?.map((ev: any) => (
              <MyEvent
                id={ev.event.id}
                name={ev.event.name!}
                description={ev.event.description!}
                funding={ev.event.funding!}
                location={ev.event.location!}
                startDate={ev.event.date}
                // d_option={checkExistance(ev.id)}
              />
            ))
          ) : (
            <div>"No Joined Events"</div>
          )}
        </div>
      </div>
    </>
  );
}

export default page;
