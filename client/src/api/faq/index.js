import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AuthAPI = () => {
  if (typeof window !== "undefined") {
    return axios.create({
      baseURL: `http://localhost:4000/v1`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return axios.create({
      baseURL: `http://localhost:4000/v1`,
      headers: {
        authorization: `Bearer`,
        "Content-Type": "application/json",
      },
    });
  }
};
const postQuestion = async (text) => {
  const { data } = await AuthAPI().post("/user/create-question", { text });
  return data;
};
const answerReply = async (text, questionId) => {
  const { data } = await AuthAPI().post("/user/answer-question", {
    text,
    questionId,
  });
  return data;
};
const deleteMyQuestion = async (QuestionId) => {
  console.log(QuestionId);
  const { data } = await AuthAPI().delete(
    `/user/delete-question/${QuestionId}`
  );
  console.log(data);
  return data;
};

const getAllquestionsInfo = async (searchText) => {
  searchText = searchText || "";
  console.log(searchText);

  try {
    const { data } = await AuthAPI().get(`/user/get-allquestions`);
    console.log(data);
    return data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllquestionsInfoQuery = () =>
  useQuery({
    queryKey: ["questions"],
    queryFn: () => getAllquestionsInfo(""),
    select: (data) => {
      console.log(data);
      return data;
    },
  });
export {
  getAllquestionsInfoQuery,
  postQuestion,
  answerReply,
  deleteMyQuestion,
  getAllquestionsInfo,
};
