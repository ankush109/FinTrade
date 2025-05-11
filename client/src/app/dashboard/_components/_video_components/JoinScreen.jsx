"use client";
import React, { useState } from "react";

export function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState();
  const [tab, setTab] = useState("join");

  const joinMeeting = async () => {
    if (!meetingId.trim()) return alert("Please enter a meeting ID.");
    await getMeetingAndToken(meetingId);
  };

  const createMeeting = async () => {
    await getMeetingAndToken();
  };

  return (
    <div className="flex justify-center items-center  min-h-screen">
      <div className="bg-white p-10 rounded-lg  text-white w-96">
      
        {/* Tab buttons */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => setTab("join")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              tab === "join" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Join
          </button>
          <button
            onClick={() => setTab("create")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              tab === "create" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Create
          </button>
        </div>

        {/* Conditional input for Join tab */}
        {tab === "join" && (
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 bg-white text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Meeting ID"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
          />
        )}

        <div className="flex flex-col space-y-4">
          {tab === "join" ? (
            <button
              onClick={joinMeeting}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-md font-semibold transition-colors duration-300"
            >
              Join Meeting
            </button>
          ) : (
            <button
              onClick={createMeeting}
              className="bg-blue-500 hover:bg-green-600 text-white py-3 rounded-lg shadow-md font-semibold transition-colors duration-300"
            >
              Create Meeting
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
