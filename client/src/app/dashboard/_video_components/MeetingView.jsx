// @ts-nocheck
import { useState, useEffect } from "react";
import { Controls } from "./Controls";
import { ParticipantView } from "./ParticipantView";
import { useMeeting } from "@videosdk.live/react-sdk";

export function MeetingView(props) {
  const [joined, setJoined] = useState("");
  const [copied, setCopied] = useState(false); // for feedback

  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setJoined("JOINING");
      join();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.meetingId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 sec
    });
  };

  return (
    <div className="max-h-screen">
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-black text-3xl font-semibold">
            Meeting Id: {props.meetingId}
          </h3>
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {joined === "JOINED" ? (
         <div className="flex flex-col border2 border-gray-300 p-2">
           <div className="grid grid-cols-2 gap-2 ">
            {[...participants.keys()].map((participantId) => (
              <ParticipantView participantId={participantId} key={participantId} />
            ))}
              
          </div>
          <Controls />
          </div>
        ) : joined === "JOINING" ? (
          <p className="text-white text-md">Joining the meeting...</p>
        ) : (
          <p className="text-white text-md">Waiting to join...</p>
        )}
      </div>
    </div>
  );
}
