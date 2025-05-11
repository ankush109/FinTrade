import { useMutation } from "@tanstack/react-query";
import {AuthAPI} from "../client";

const createFinance = async (finance) => {
  const {data} = await AuthAPI().post("/user/finance/create",finance)
  return data
};

export const useCreateFinanceMutation = () => {
  return useMutation({
    mutationFn: createFinance,
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};