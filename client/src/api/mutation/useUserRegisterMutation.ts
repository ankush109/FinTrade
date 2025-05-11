import { useMutation } from "@tanstack/react-query";
import { API } from "../client";

const registerUser = (formData) => API.post("/auth/register", formData);



export const useUserRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
      }
    },
    onError: (error) => {
      console.error("Error registering:", error);
    },
  });
};