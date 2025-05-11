"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { GetUserQuery } from "@/hooks/query/useGetUserDetails";
import { useCreateFinanceMutation } from "@/hooks/mutation/useCreateFinanceMutation";
import { useGetUserFinanceQuery } from "@/hooks/query/useGetUserFinanceQuery";

import Loader from "@/app/dashboard/bitcoin/_components/Loader";

function Page() {
  const router = useRouter();
  const user = GetUserQuery();
  const { data: financeData, isLoading, refetch } = useGetUserFinanceQuery();

  const { mutate: createFinance } = useCreateFinanceMutation();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState(Array(9).fill(""));

  const questions = [
    { question: "What is your age?", type: "number" },
    { question: "What is your profession?", type: "string" },
    { question: "What is your monthly salary?", type: "number" },
    { question: "What is your total savings?", type: "number" },
    {
      question: "What are your major monthly expenses? (e.g., Rent > 20,000)",
      type: "string",
    },
    {
      question:
        "What are your minor monthly expenses? (e.g., Clubbing < 3,000)",
      type: "string",
    },
    { question: "What are your monthly EMI payments?", type: "number" },
    { question: "What's your loan amount?", type: "number" },
    { question: "What's your number of loans?", type: "number" },
  ];

  // Redirect if finance data exists
  useEffect(() => {
    if (!isLoading && financeData?.message?.id) {
      toast.error("You have already submitted your finance data.");
      router.push("/dashboard");
    }
  }, [isLoading, financeData, router]);

  // Greeting timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
      setShowQuestions(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    const current = questions[currentQuestion];
    const value = answers[currentQuestion];

    if (!value) {
      toast.error("Please enter a value.");
      return;
    }

    if (current.type === "number" && isNaN(Number(value))) {
      toast.error("Please enter a valid number.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      submitFinance();
    }
  };

  const submitFinance = () => {
    const payload = {
      age: Number(answers[0]),
      profession: answers[1],
      salary: Number(answers[2]),
      savings: Number(answers[3]),
      majorexp: answers[4],
      minorexp: answers[5],
      emi: Number(answers[6]),
      loanammount: Number(answers[7]),
      loans: Number(answers[8]),
    };

    createFinance(payload, {
      onSuccess: () => {
        setIsSubmitting(true);
        toast.success("Finance data submitted successfully!");
        setTimeout(() => {
          setIsSubmitting(false);
          router.push("/dashboard");
        }, 2000);
      },
      onError: (error) => {
        console.error("Error creating finance data:", error);
        toast.error("Failed to create finance data.");
      },
    });
  };

  if (isLoading || financeData?.message?.id)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
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
    />
    <motion.div
      className="absolute bottom-10 left-20 w-80 h-80 bg-indigo-300 rounded-full filter blur-2xl opacity-40 animate-pulse"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
    />
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
    <div>Hello, {user?.data?.name}</div>
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
      {questions[currentQuestion].question}
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
      />
    </motion.div>
    <NextButton
      handleNext={handleNext}
      currentQuestion={currentQuestion}
      questions={questions}
    />
  </motion.div>
);

const NextButton = ({ handleNext, currentQuestion, questions }) => {
  const isDisabled = currentQuestion >= questions.length;
  return (
    <motion.button
      onClick={handleNext}
      disabled={isDisabled}
      className={`mt-10 px-10 py-4 text-lg font-semibold text-white rounded-full shadow-lg flex items-center gap-2 ${
        !isDisabled
          ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
          : "bg-gray-400 cursor-not-allowed"
      }`}
      whileHover={!isDisabled ? { scale: 1.1 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
    >
      {currentQuestion < questions.length - 1 ? "Next" : "Submit"}{" "}
      <span className="text-2xl">&#8594;</span>
    </motion.button>
  );
};

export default Page;
