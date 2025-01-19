"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFinance } from "../../api/finance/index";
import toast from "react-hot-toast";
import { GetUserQuery } from "../../api/user/index";
import { useRouter } from "next/navigation";

function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Start at the first question (index 0 now)
  const [showGreeting, setShowGreeting] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);

  const user = GetUserQuery();
  const questions = [
    "What is your age?",
    "What is your profession?",
    "What is your monthly salary?",
    "What are your major monthly expenses? (e.g., Rent > 20,000)",
    "What are your minor monthly expenses? (e.g., Clubbing < 3,000)",
    "What are your monthly EMI payments?",
    "What's your loan amount?",
    "What's your number of loans?",
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const router = useRouter();

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      submitFinance();
    }
  };

  const handleInputChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const submitFinance = async () => {
    if (answers.includes("")) {
      console.log("Please complete all questions before submitting!");
      return;
    }

    const financeData = {
      age: answers[0],
      profession: answers[1],
      salary: answers[2],
      majorexp: answers[3],
      minorexp: answers[4],
      emi: answers[5],
      loanammount: answers[6],
      loans: answers[7],
    };

    console.log(financeData, "Finance Data");

    try {
      const res = await createFinance(financeData);
      if (res.status === 200) {
       
          router.push("/dashboard");
      
      }
      console.log("Finance data submitted successfully!");
      toast.success("done");
    } catch (error) {
      console.error("Error submitting finance data:", error);
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.5)" },
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    setTimeout(() => {
      setShowGreeting(false);
      setShowQuestions(true);
    }, 2000);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 80%)",
        }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute top-20 right-40 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-pulse"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-10 left-20 w-80 h-80 bg-indigo-300 rounded-full filter blur-2xl opacity-40 animate-pulse"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>

      {showGreeting && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-semibold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="transform -translate-x-1/2 -translate-y-1/2">
            {"Hello, " + user?.data?.name}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {showQuestions && (
          <motion.div
            key={currentQuestion}
            className="relative flex flex-col items-center justify-center min-h-screen px-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backgroundVariants}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl font-extrabold text-white mb-8 text-center drop-shadow-lg"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={textVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {questions[currentQuestion]}
            </motion.h1>
            <motion.input
              type="text"
              placeholder="Type your answer here..."
              value={answers[currentQuestion]}
              onChange={handleInputChange}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-3/4 max-w-lg px-6 py-3 text-lg font-medium text-gray-700 bg-white border-none rounded-full shadow-2xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400"
            />
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-3/4 bg-white rounded-full overflow-hidden h-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-indigo-600"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </motion.div>

            <NextButton
              handleNext={handleNext}
              currentQuestion={currentQuestion}
              questions={questions}
              buttonVariants={buttonVariants}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const NextButton = ({ handleNext, currentQuestion, questions, buttonVariants }) => {
  const isDisabled = currentQuestion === questions.length;

  return (
    <motion.button
      onClick={handleNext}
      disabled={isDisabled}
      className={`mt-10 px-10 py-4 text-lg font-semibold text-white rounded-full shadow-lg flex items-center gap-2 ${
        !isDisabled
          ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
          : "bg-gray-400 cursor-not-allowed"
      }`}
      variants={buttonVariants}
      whileHover={!isDisabled ? "hover" : ""}
      whileTap={!isDisabled ? "tap" : ""}
    >
      {currentQuestion < questions.length - 1 ? "Next" : "Submit"}{" "}
      <span className="text-2xl">&#8594;</span>
    </motion.button>
  );
};

export default Page;
