import { useMutation } from "@tanstack/react-query";
import {AuthAPI} from "../client";

type AnswerReplyInput = {
  text: string;
  questionId: string;
};

const answerReply = async ({ text, questionId }: AnswerReplyInput) => {
  const { data } = await AuthAPI().post("/user/answer-question", {
    text,
    questionId,
  });
  return data;
};

export const useAnswerReplyMutation = () => {
  return useMutation({
    mutationFn: answerReply,
    onError: (error) => {
      console.error("Error posting question:", error);
    },
  });
};
