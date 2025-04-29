"use client"
// @ts-nocheck
import React, { useState } from "react";
import {
  MeetingProvider,
} from "@videosdk.live/react-sdk";
import { createMeeting } from "../config/Api";

import { JoinScreen } from "./JoinScreen";
import { MeetingView } from "./MeetingView";

export function Meet() {
 const [meetingId, setMeetingId] = useState(null);
  const [token, setToken] = useState(null);

  
const getMeetingAndToken = async (id) => {
    // 1. Fetch token from your backend
    const fetchedToken = await fetch("http://localhost:4000/v1/auth/create-token")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        return data.token;
      });
    setToken(fetchedToken);
    console.log(fetchedToken, "token");
    // 2. Create meeting with this token
    const _meetingId = id == null ? await createMeeting({ token: fetchedToken }) : id;
    setMeetingId(_meetingId);
    console.log(_meetingId, "meetingId");

  };

 
  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return token && meetingId ? (
    <MeetingProvider
      config={{
        meetingId: meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "ANKUSH's Org",
      }}
      token={token}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <div className="grid grid-cols-2 gap-4">
      <div>  <JoinScreen getMeetingAndToken={getMeetingAndToken} /></div>
      <div className="bg-gray-400">hi</div>
    </div>
  );
}

export default Meet;
