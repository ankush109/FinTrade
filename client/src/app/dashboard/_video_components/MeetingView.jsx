// @ts-nocheck
import { useState, useEffect } from "react";
import { Controls } from "./Controls";
import { ParticipantView } from "./ParticipantView";
import { useMeeting } from "@videosdk.live/react-sdk";

export function MeetingView(props) {
  const [joined, setJoined] = useState("");

  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },

    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  useEffect(() => {
    // Start a 5-second timer after the component mounts
    const timer = setTimeout(() => {
      setJoined("JOINING"); // Update state to show the joining status
      join(); // Automatically join the meeting after 5 seconds
    }, 0); // 5000 ms = 5 seconds

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div className="  min-h-screen" >
      <div className="p-10">
      <h3 className="text-back text-3xl font-semibold">
  Meeting Id: {props.meetingId}
</h3>

      {joined === "JOINED" ? (
        <div className="flex gap-10">
          {[...participants.keys()].map((participantId) => (
            <ParticipantView participantId={participantId} key={participantId} />
          ))}
       
        </div>
      ) : joined === "JOINING" ? (
        <p className="text-white text-md" > Joining the meeting...</p>
      ) : (
        <p className="text-white text-md">Waiting to join...</p>
      )}
      </div>
    </div>
  );
}
