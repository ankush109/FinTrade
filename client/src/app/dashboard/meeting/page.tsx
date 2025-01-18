"use client";
import React, { useEffect, useState } from "react";
import { fetchmentors, Mymeetings } from "../../../api/meeting/index";
import Loading from "../_components/Loader";
import ConsultantCard from "../_components/ConsultantCard";
function page() {
  const {
    isLoading: MentorLoading,
    data: mentordata,
    isError: MentorError,
  } = fetchmentors();
  const { data: mymeetings, isLoading: mymeetingsLoading } = Mymeetings();
  const [meetings, setMeetings] = useState([]);
  const [bookedmeetings, setbookmeetings] = useState([]);

  useEffect(() => {
    if (!MentorLoading) {
      setMeetings(mentordata.message);
    }
    if (!mymeetingsLoading) {
      setbookmeetings(mymeetings.message);
    }
  }, [MentorLoading, mymeetingsLoading]);
  if (MentorError) {
    return (
      <div>
        <div>Error Loading ...</div>
      </div>
    );
  }
  if (MentorLoading) {
    return <Loading />;
  }
  console.log(mymeetings, "e");
  return (
    <>
      <div className="primary-container mt-4 ">
        <div className="text-center font-serif text-4xl">
          Available <span className="font-comf text-theme">Consultors</span>
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-2 p-4 gap-4 mb-5">
          {meetings?.length > 0 ? (
            meetings?.map((meet: any) => (
              <ConsultantCard
                id={meet.id!}
                phonenumber={meet?.phonenumber!}
                email={meet.email!}
                name={meet.name!}
              />
            ))
          ) : (
            <h1>no mentors found</h1>
          )}
        </div>
        <hr />
        <div className="text-center font-serif text-4xl mt-5">
          Booked <span className="font-comf text-theme">Consultors</span>
        </div>
        <div className="w-full grid grid-cols-3">
          {mymeetings?.map((meet) => {
            return (
              <div className="bg-gray-100 w-82 p-4 m-4 rounded-md shadow-md">
                <div className="mb-2">
                  <div className="font-semibold text-lg">
                    Name: {meet?.guest.name}
                  </div>
                  <div>Query:{meet?.notes}</div>
                </div>
                <div className="text-sm flex gap-3 text-gray-700">
                  <div>Status: </div>
                  <div>
                    {meet.status === "confirmed" ? (
                      <div className="text-green-600 font-bold">
                        {meet.status}
                      </div>
                    ) : (
                      <div className="text-red-600 font-bold">
                        {meet.status}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default page;
