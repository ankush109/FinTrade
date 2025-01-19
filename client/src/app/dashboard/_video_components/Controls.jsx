"use client"
import { FaSignOutAlt, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useState } from "react";

export function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const [mic, setmic] = useState(true);
  const [video, setvideo] = useState(true);

  return (
    <div className="bg-stone-800 rounded-3xl p-2 w-[200px] absolute bottom-2 left-[200px] right-10 flex items-center justify-evenly text-white">
      <button onClick={() => leave()}><FaSignOutAlt /></button>
      <button onClick={() => {
        toggleMic();
        setmic(!mic);
      }}>
        {mic ? <FaMicrophone className="w-10" /> : <FaMicrophoneSlash />}
      </button>
      <button onClick={() => {
        toggleWebcam();
        setvideo(!video);
      }}>
        {video ? <FaVideo /> : <FaVideoSlash />}
      </button>
    </div>
  );
}
