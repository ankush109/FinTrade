import { useMutation } from "@tanstack/react-query";
import AuthAPI from "../client";

const postQuestion = async (text) => {
  const { data } = await AuthAPI().post("/user/create-question", { text });
  return data;
};


export const usePostQuestionMutation = () => {
  return useMutation({
    mutationFn: postQuestion,
    onError: (error) => {
      console.error("Error posting question:", error);
    },
  });
}