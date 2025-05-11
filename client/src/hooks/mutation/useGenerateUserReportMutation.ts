
import { useMutation } from "@tanstack/react-query";
import {AuthAPI} from "../client";

const generateReport = async () => {
  const {data} = await AuthAPI().post("/report/generate-report")
  return data
};

export const useGenerateUserReportMutation = () => {
  return useMutation({
    mutationFn: generateReport,
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};