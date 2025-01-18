import { GetUserQuery } from "@/api/user";
import { Calendar, ClipboardPlus, Loader, Timer } from "lucide-react";
import "chart.js/auto";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import WeekPicker from "./Calandar";
import Image from "next/image";
import taskanimation from "@/assets/gifs/gif1.json";
import Lottie from "react-lottie-player";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Mymeetings } from "@/api/meeting";
import { getMyDailyTaskQuery, startMyTask } from "@/api/tasks";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
function DashboardPanel() {
  const { isLoading, data: userData } = GetUserQuery();
  const { data: myTaskSet, isLoading: taskSetLoading } = getMyDailyTaskQuery();
  const [completedTasks, setCompletedTask] = useState([]);
  console.log(myTaskSet?.taskSet, "mytasks");
  const completedTask = () => {
    const data = myTaskSet?.taskSet?.tasks;
    const filteredData = data?.filter((d) => d.status === "completed");
    console.log(filteredData, "f");
    setCompletedTask(filteredData);
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getMonthName = (monthIndex) => {
    return monthNames[monthIndex];
  };
  useEffect(() => {
    completedTask();
  }, [taskSetLoading]);
  const getStartDate = (startDate, next): any => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + next - 1);

    // console.log(newDate.m());
    const data = {
      day: newDate.getDate(),
      month: newDate.getMonth(),
      time: newDate.getTime(),
    };
    return data;
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const startTracking = async () => {
    toast.success("task started successfully");
    const { data } = await startMyTask();
    console.log(data, "data from startmeeting");
  };
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Score",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(0, 0, 255, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Score",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "rgba(0, 128, 0, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="m-5">
      <div className="text-3xl font-semibold mb-4">Hi, {userData?.name}.</div>
      <span className="text-gray-500 font-semibold mt-10">
        Let's track your health daily!
      </span>
      <div className="flex">
        <div className="w-[70%]  p-3">
          <div className="font-semibold mb-6 mt-5">
            Your Comming Appointments
          </div>
          <div className="flex gap-4 p-3 border border-gray-200 rounded-xl">
            <div className="flex-shrink-0">
              <Image
                className="rounded-xl"
                alt="Hospital Image"
                width={200}
                height={200}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Hospital-de-Bellvitge.jpg/800px-Hospital-de-Bellvitge.jpg"
              />
              <div className="mt-2">
                <div className="font-bold">Ruby Hospital</div>
                <div className="text-sm text-gray-500">Kasba, Kolkata</div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <ClipboardPlus className="text-blue-500" />
                <div className="flex flex-col">
                  <div className="font-medium">Dr. Souvik Sen</div>
                  <div className="text-gray-500 text-sm">Physician</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-full p-1">
                    <Calendar className="text-blue-400" />
                  </div>
                  <div className="text-sm">26th Jan 2024</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-full p-1">
                    <Timer className="text-orange-400" />
                  </div>
                  <div className="text-sm">09:00 AM</div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="flex w-full justify-between mt-5">
            <div className="flex flex-col">
              <div>
                <div className=" font-comf font-semibold text-3xl">
                  Mental Health Progress
                </div>
                <div className="flex flex-row justify-center gap-8 mt-3">
                  <div className="border border-gray-300 rounded-3xl p-2 w-[320px] h-[250px] rounded-xl flex items-center justify-center">
                    <Bar data={barData} options={options} />
                  </div>
                  <div className="border border-gray-300 rounded-3xl p-2 w-[320px] h-[250px] rounded-xl flex items-center justify-center">
                    <Line data={lineData} options={options} />
                  </div>
                </div>
                {/* <div className="flex gap-8 p-6">
                  <div
                    className=" border border-gray-300 rounded-3xl
                         p-2 w-[320px] h-[320px] rounded-xl"
                  ></div>
                  <div
                    className=" border border-gray-300 rounded-3xl
                         p-2 w-[320px] h-[320px] rounded-xl"
                  ></div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="py-20">
            <div>
              <div className=" font-comf font-semibold text-2xl mb-5">
                Completed Tasks
              </div>
            </div>
            {completedTasks &&
              completedTasks.map((com) => {
                const j = getStartDate(myTaskSet?.startDate, com.day).month;
                return (
                  <div>
                    <div
                      className=" border border-gray-300 rounded-3xl
                         p-2 w-[400px] rounded-xl"
                    >
                      {com.description}
                      <Lottie
                        loop
                        animationData={taskanimation}
                        play
                        style={{ width: 150, height: 150 }}
                      />
                      <div className="flex gap-2 text-right items-end justify-end text-sm font-bold">
                        <div className="FONT">
                          Task completed on{" "}
                          {getStartDate(myTaskSet?.startDate, com.day).day}
                        </div>
                        <div>{getMonthName(j)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-start mb-3">Your Daily Routine</h1>
          <div className="flex flex-row">
            <div className="border border-gray-300 rounded-xl">
              <WeekPicker completedTasks={completedTasks} />
            </div>
          </div>
          <div className="p-6">
            <div className="mb-5">
              {myTaskSet?.taskSet ? (
                ""
              ) : (
                <Button
                  onClick={() => {
                    startTracking();
                  }}
                  className="mt-4"
                >
                  Start Your Progress Tracking
                </Button>
              )}
            </div>
            {completedTasks ? (
              <div className="w-[200px] h-[250px] bg-gray-200 border border-gray-300 rounded-xl p-6">
                <div className="text-center font-semibold mb-5">
                  Daily Progress
                </div>
                <CircularProgressbar
                  value={completedTasks?.length}
                  className="w-8"
                  text={`${Math.ceil((completedTasks?.length / 30) * 100)}%`}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "butt",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: `#3C17B5`,
                    textColor: "black",
                    trailColor: "white",
                    backgroundColor: "#597445",
                  })}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPanel;
