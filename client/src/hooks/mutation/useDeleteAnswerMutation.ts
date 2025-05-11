import { useMutation } from "@tanstack/react-query";
import {AuthAPI} from "../client";

const deleteMyQuestion = async (QuestionId) => {
  console.log(QuestionId);
  const { data } = await AuthAPI().delete(
    `/user/delete-question/${QuestionId}`
  );
  console.log(data);
  return data;
};

export const useDeleteMyQuestionMutation = () => {
  return useMutation({
    mutationFn: deleteMyQuestion,
    onError: (error) => {
      console.error("Error deleting question:", error);
    },
  });
};