"use client";
// @ts-nocheck

import { useParticipant } from "@videosdk.live/react-sdk";
import { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import { Controls } from "./Controls";
import { useTheme } from "@/context/ThemeContext";

export function ParticipantView(props) {
  const { isDarkMode } = useTheme();
  const micRef = useRef(null);
  const {
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal,
    displayName,
  } = useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("micRef.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div>
      <p className={isDarkMode ? "text-white" : "text-black"}>
        Webcam: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}
      </p>

      <audio ref={micRef} autoPlay playsInline muted={isLocal} />

      <div className="border-2 border-gray-300 p-2">
        {webcamOn ? (
          <ReactPlayer
            width={550}
            height={400}
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        ) : (
          <div
            style={{
              width: "550px",
              height: "400px",
              backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f0f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid #ccc",
              borderRadius: "8px",
              color: isDarkMode ? "#fff" : "#000",
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <span>Webcam is off</span>
          </div>
        )}
        {/* Show controls only for local participant */}
     
      </div>
    </div>
  );
}
