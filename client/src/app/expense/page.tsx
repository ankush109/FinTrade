"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFinance } from "../../api/finance/index";
import toast from "react-hot-toast";
import { GetUserQuery } from "../../api/user/index";
import { getMyfinance } from "../../api/finance/index";
import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";
import lo2 from "../../assets/./1.json";
function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Start at the first question (index 0 now)
  const [showGreeting, setShowGreeting] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a state for submission

  const user = GetUserQuery();
  const { refetch } = getMyfinance();

  const questions = [
    "What is your age?",
    "What is your profession?",
    "What is your monthly salary?",
    "What is your total savings?",
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
      savings: answers[3],
      majorexp: answers[4],
      minorexp: answers[5],
      emi: answers[6],
      loanammount: answers[7],
      loans: answers[8],
    };

    console.log(financeData, "Finance Data");

    try {
      const res = await createFinance(financeData);
      if (res.success) {
        setIsSubmitting(true); // Show the "Generating Dashboard" text
        setTimeout(() => {
          router.push("/dashboard"); // Navigate to the dashboard after 5 seconds
        }, 5000);
      }
      refetch();
      toast.success("Finance data submitted successfully!");
    } catch (error) {
      console.error("Error submitting finance data:", error);
      toast.error("Failed to submit finance data.");
    }
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
      <BackgroundAnimation />
      {showGreeting && <Greeting user={user} />}
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div
            key="generating-dashboard"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          >
            <Lottie
              loop
              animationData={lo2}
              play
              style={{ width: 350, height: 350 }}
            />
            Generating Dashboard...
          </motion.div>
        ) : (
          showQuestions && (
            <QuestionsSection
              currentQuestion={currentQuestion}
              questions={questions}
              answers={answers}
              handleInputChange={handleInputChange}
              handleNext={handleNext}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
}

const BackgroundAnimation = () => (
  <>
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 80%)",
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
  </>
);

const Greeting = ({ user }) => (
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
);

const QuestionsSection = ({
  currentQuestion,
  questions,
  answers,
  handleInputChange,
  handleNext,
}) => (
  <motion.div
    key={currentQuestion}
    className="relative flex flex-col items-center justify-center min-h-screen px-4"
    initial="hidden"
    animate="visible"
    exit="exit"
    transition={{ duration: 0.6 }}
  >
    <motion.h1
      className="text-5xl font-extrabold text-white mb-8 text-center drop-shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {questions[currentQuestion]}
    </motion.h1>
    <motion.input
      type="text"
      placeholder="Type your answer here..."
      value={answers[currentQuestion]}
      onChange={handleInputChange}
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
        style={{
          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
        }}
        initial={{ width: 0 }}
        animate={{
          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
        }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </motion.div>
    <NextButton
      handleNext={handleNext}
      currentQuestion={currentQuestion}
      questions={questions}
    />
  </motion.div>
);

const NextButton = ({ handleNext, currentQuestion, questions }) => {
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
      whileHover={!isDisabled ? { scale: 1.1 } : ""}
      whileTap={!isDisabled ? { scale: 0.95 } : ""}
    >
      {currentQuestion < questions.length - 1 ? "Next" : "Submit"}{" "}
      <span className="text-2xl">&#8594;</span>
    </motion.button>
  );
};

export default Page;
