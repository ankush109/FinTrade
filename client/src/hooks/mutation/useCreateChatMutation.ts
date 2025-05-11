import { useMutation, useQueryClient } from "@tanstack/react-query";
import {AuthAPI} from "../client";

const createUserChat = async (chat) => {
  const { data } = await AuthAPI().post("/bot/create-expense", {
    chat: chat,
  });
  return data;
};

export const useCreateUserChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserChat,
    onSuccess: () => {
      console.log("Task added successfully");
      queryClient.invalidateQueries({ queryKey: ["get-my-expense"] });
      queryClient.invalidateQueries({ queryKey: ["get-my-expense-categories"] });

    },
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};
