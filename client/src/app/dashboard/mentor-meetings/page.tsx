"use client";
import { MentorMeetings, confirmMeeting, rejectMeeting } from "@/api/meeting";
import React from "react";
import { Button } from "@/components/ui/button";

function Page() {
  const info = MentorMeetings();

  const confirm = async (id) => {
    await confirmMeeting({ meetingId: id });
    info.refetch();
  };

  const reject = async (id) => {
    await rejectMeeting({ meetingId: id });
    info.refetch();
  };

  return (
    <div className="mt-10 mx-auto max-w-7xl">
      <div className="text-center font-comf font-semibold text-4xl mb-10">
        Alloted Meetings
      </div>
      {info.data?.map((d) => (
        <div key={d.id} className="mx-auto mb-4 w-3/4">
          <div className="bg-slate-100 p-4 flex justify-between items-center rounded-xl">
            <div>
              <div className="mb-2">
                <span className="font-semibold">Name:</span> {d.host?.name}
              </div>
              <div>
                <span className="font-semibold">Note:</span> {d.notes}
              </div>
            </div>
            <div className="flex gap-4">
              {d.status === "requested" ? (
                <Button
                  className="bg-green-400 p-2 text-white rounded-2xl"
                  onClick={() => confirm(d.id)}
                >
                  Confirm Meeting
                </Button>
              ) : d.status === "rejected" ? (
                <Button className="bg-red-400 p-2 text-white rounded-2xl">
                  {d.status}
                </Button>
              ) : (
                <Button className="bg-green-400 p-2 text-white rounded-2xl">
                  {d.status}
                </Button>
              )}
              {d.status === "requested" && (
                <Button
                  className="bg-red-400 p-2 text-white rounded-2xl"
                  onClick={() => reject(d.id)}
                >
                  Reject Meeting
                </Button>
              )}
              {/* {d.status === "rejected" && (
                <Button className="bg-red-400 p-2 text-white rounded-2xl">
                  {d.status}
                </Button>
              )} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
