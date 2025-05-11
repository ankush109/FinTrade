import { useMutation } from "@tanstack/react-query";
import { API } from "../client";

const loginUser = (formData) => API.post("/auth/login", formData);
export const useUserLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
      }
    },
    onError: (error) => {
      console.error("Error logging in:", error);
    },
  });
};