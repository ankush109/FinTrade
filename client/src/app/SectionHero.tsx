"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  ArrowRightSquare,
  ChefHat,
  Cross,
  ListCollapse,
  LoaderIcon,
  XCircleIcon,
} from "lucide-react";
import cht from "../assets/images.png";
import Link from "next/link";

function SectionHero() {
  const [loading, setloading] = useState(false);
  const [chatbot, setChatbot] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(question);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        `question=${encodeURIComponent(question)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response) {
        setloading(false);
        setAnswer(response.data.answer);
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 gap-4 p-10 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen items-center">
        <div className="flex ml-20 flex-col justify-center text-center sm:text-left w-full sm:w-[80%]">
          <h1 className="text-5xl font-semibold mb-4 animate-fade-in">
            Your One-Stop Solution for Mental Well-being
          </h1>
          <div className="text-2xl mt-10 animate-fade-in-delay">
            <Typewriter
              words={[
                "Take the First Step to Wellness",
                "Consult Top Mental Health Experts",
                "Personalized 30-Day Mental Exercise Plan",
                "Join Supportive Communities",
              ]}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
          <Link href="/test">
            <Button className="bg-blue-600 text-xl w-[200px] mt-4 mx-auto sm:mx-0 animate-fade-in-delay">
              Take a Test
            </Button>
          </Link>
        </div>
        <div className="flex justify-center animate-fade-in-delay">
          <Image
            className="rounded-3xl shadow-lg"
            alt="Mental wellness"
            height={500}
            width={700}
            src="https://www.collegetransitions.com/wp-content/uploads/2023/06/blog-HowLongDoesTakeDoctor-1460x822-1.webp"
          />
        </div>
      </div>
      <div className="fixed bottom-5 right-5">
        <div
          className="cursor-pointer w-[80px] h-[80px] rounded-full"
          onClick={() => {
            setChatbot(true);
          }}
        >
          <img className="w-full rounded-full" src={cht.src} alt="Chatbot" />
        </div>
        <div
          className={`${
            chatbot ? "" : "hidden"
          } w-[300px] h-[400px] bg-white rounded-lg fixed bottom-24 right-5 p-3`}
        >
          <div className="flex justify-end">
            <XCircleIcon
              className="cursor-pointer"
              onClick={() => {
                setChatbot(false);
              }}
            />
          </div>
          <div className="px-5 w-full h-3/4 my-2 border-2 border-gray-500 p-2 overflow-y-auto gap-2">
            {answer && (
              <div className="chat-message">
                <strong>BOT:</strong> {answer}
              </div>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-x-2 flex border-2 border-gray-500 px-2 py-1 rounded-md"
          >
            <input
              type="text"
              placeholder="Search for the meeting..."
              className="w-full outline-none "
              value={question}
              onChange={handleQuestionChange}
            />
            <button type="submit">
              {loading ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                <ArrowRightSquare />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SectionHero;
