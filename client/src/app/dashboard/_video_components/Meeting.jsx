"use client"
// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../config/Api";
import ReactPlayer from "react-player";
import { JoinScreen } from "./JoinScreen";
import { MeetingView } from "./MeetingView";

export function Meet() {
  const [meetingId, setMeetingId] = useState(null);

 
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

 
  const onMeetingLeave = () => {
    setMeetingId(null);
  };
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmNTdjNjAzMy1mMTZkLTQ2NzYtODdiZS01NmJhNWEzYjYxMTQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczNzMwNzI0NywiZXhwIjoxNzM3MzkzNjQ3fQ.DUW0sFEp2Pla9N-tuxenJfNjC6hs3GBzxntWJgUWG0k"
  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId: "pwxs-zije-lu4v",
        micEnabled: true,
        webcamEnabled: true,
        name: "ANKUSH's Org",
      }}
      token={token}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default Meet;
