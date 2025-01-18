"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import img1 from "../../public/img1.jpg";
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
      <div className="grid grid-cols-2 gap-4 p-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen items-center">
        <div className="flex ml-20 flex-col justify-center text-center sm:text-left w-full sm:w-[80%]">
          <h1 className="text-5xl font-semibold mb-4 animate-fade-in text-white">
            Empower Your Financial Journey
          </h1>
          <div className="text-2xl mt-10 animate-fade-in-delay text-white">
            <Typewriter
              words={[
                "Track Your Expenses Effortlessly",
                "Achieve Your Financial Goals",
                "Personalized Investment Insights",
                "Consult Financial Experts Anytime",
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
            <Button className="bg-blue-700 text-xl w-[200px] mt-4 mx-auto sm:mx-0 animate-fade-in-delay rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="flex justify-center animate-fade-in-delay">
          <Image
            className="rounded-3xl shadow-lg"
            alt="Mental wellness"
            height={400}
            src={img1}
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
