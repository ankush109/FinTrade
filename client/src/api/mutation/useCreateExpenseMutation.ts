import { useMutation } from "@tanstack/react-query";
import {AuthAPI} from "../client";

 const createExpense = async(formdata)=>{
    
  const {data} = await AuthAPI().post("/user/createexpense",formdata);
  return data
}



export const useCreateExpenseMutation = () => {
  return useMutation({
    mutationFn: createExpense,
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};