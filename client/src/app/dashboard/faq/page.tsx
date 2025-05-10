"use client";
import React, { useEffect, useState } from "react";
import {
  answerReply,
  deleteMyQuestion,
  getAllquestionsInfo,
  getAllquestionsInfoQuery,
  postQuestion,
} from "@/api/faq/index";

import { Button } from "@/components/ui/button";
import Loading from "../_components/Loader";
import Sidebar from "../_components/sidebar";
import { DeleteIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";
import { GetUserQuery } from "@/api/query/useGetUserDetails";

function Discuss() {
  const { isDarkMode } = useTheme();
  const q = GetUserQuery();
  const {
    data: questions,
    isLoading,
    isError,
    refetch,
  } = getAllquestionsInfoQuery();

  const [data, setData] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [openCommentsMap, setOpenCommentsMap] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (questions) setData(questions);
  }, [questions]);

  const handleReply = (questionId) => setReplyingTo(questionId);
  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const handleCommentsToggle = (id) => {
    setOpenCommentsMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (id) => {
    const res = await deleteMyQuestion(id);
    if (res.success) {
      toast.success("Post has been deleted");
      refetch();
    } else {
      toast.error(res.message);
    }
  };

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return toast.error("Please enter a question.");

    const res = await postQuestion(newQuestion);
    if (res.success) {
      toast.success("Posted successfully");
      setNewQuestion("");
      refetch();
    }
  };

  const handleSubmitReply = async (questionId) => {
    if (!replyText.trim()) return toast.error("Please enter a reply.");
    const res = await answerReply(replyText, questionId);

    if (res.success) {
      toast.success("Reply posted");
      setReplyText("");
      setReplyingTo(null);
      refetch();
    }
  };

  const renderReplyInput = (questionId) => (
    <div className="mb-4">
      <textarea
        rows={3}
        className={`border rounded-lg p-2 w-full max-w-2xl ${
          isDarkMode
            ? "bg-zinc-800 text-white border-zinc-600"
            : "bg-white text-black border-gray-300"
        }`}
        placeholder="Write your reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <div className="mt-2 space-x-2">
        <Button onClick={() => handleSubmitReply(questionId)}>Submit</Button>
        <Button variant="secondary" onClick={handleCancelReply}>
          Cancel
        </Button>
      </div>
    </div>
  );

  const filteredData = data?.filter((q) => {
    const matchesSearch = q.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const isMine = q.userId === q?.data?.id;
    return matchesSearch && (activeTab === "all" || isMine);
  });

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div
      className={`min-h-screen p-4 ${
        isDarkMode ? "bg-zinc-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search questions..."
          className={`w-[400px] px-4 py-2 rounded-full border ${
            isDarkMode
              ? "bg-zinc-800 border-zinc-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <h1 className="text-3xl font-semibold mb-4 text-center">
        Frequently Asked Questions
      </h1>

      <form onSubmit={handlePostQuestion} className="mb-6 text-center">
        <input
          type="text"
          placeholder="Ask your question..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className={`px-4 py-2 rounded-lg w-[60%] border ${
            isDarkMode
              ? "bg-zinc-800 border-zinc-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />
        <Button type="submit" className="ml-4">
          Post Question
        </Button>
      </form>

      <div className="flex justify-center mb-6 space-x-4">
        <Button
          variant={activeTab === "all" ? "default" : "secondary"}
          onClick={() => setActiveTab("all")}
        >
          All Questions
        </Button>
        <Button
          variant={activeTab === "my" ? "default" : "secondary"}
          onClick={() => setActiveTab("my")}
        >
          My Questions
        </Button>
      </div>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p className="text-red-500 text-center">Error loading questions.</p>
      ) : (
        <div className="space-y-6">
          {filteredData?.map((question, index) => (
            <div
              key={question.id}
              className={`rounded-lg p-4 border ${
                isDarkMode
                  ? "border-zinc-700 bg-zinc-800"
                  : "border-gray-300 bg-gray-100"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    #{index + 1} — {question.text}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Posted on {formatDate(question.createdAt)}
                  </p>
                </div>
                {question.User?.id === q?.data?.id && (
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(question.id)}
                  >
                    <DeleteIcon className="text-red-500" />
                  </Button>
                )}
              </div>

              <div className="mt-3 flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => handleCommentsToggle(question.id)}
                >
                  {openCommentsMap[question.id] ? "Hide" : "Show"} Comments (
                  {question.answers.length})
                </Button>
                <Button onClick={() => handleReply(question.id)}>
                  Add Comment
                </Button>
              </div>

              {replyingTo === question.id && renderReplyInput(question.id)}

              {openCommentsMap[question.id] && question.answers.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h3 className="font-semibold">Answers:</h3>
                  {question.answers.map((answer) => (
                    <div
                      key={answer.id}
                      className={`p-3 rounded-md ${
                        isDarkMode
                          ? "bg-zinc-700 border border-zinc-600"
                          : "bg-white border border-gray-300"
                      }`}
                    >
                      <p className="font-medium">{answer.owner?.name}</p>
                      <p className="text-sm">{answer.text}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(answer.createdAt || question.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Discuss;
