"use client";

import {
  FaSignOutAlt,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { useMeeting } from "@videosdk.live/react-sdk";
import React, { useState } from "react";

export function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true);

  return (
    <div className="bg-gray-300 w-full p-4 flex gap-4 items-center justify-center text-black border-2 border-gray-400">
      {/* Leave Button */}
      <button
        onClick={() => leave()}
        className="bg-white p-3 rounded-full hover:bg-red-500 hover:text-white transition"
        title="Leave Meeting"
      >
        <FaSignOutAlt size={20} />
      </button>

      {/* Mic Toggle */}
      <button
        onClick={() => {
          toggleMic();
          setMic(!mic);
        }}
        className="bg-white p-3 rounded-full hover:bg-gray-100 transition"
        title="Toggle Microphone"
      >
        {mic ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
      </button>

      {/* Webcam Toggle */}
      <button
        onClick={() => {
          toggleWebcam();
          setVideo(!video);
        }}
        className="bg-white p-3 rounded-full hover:bg-gray-100 transition"
        title="Toggle Video"
      >
        {video ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
      </button>
    </div>
  );
}
