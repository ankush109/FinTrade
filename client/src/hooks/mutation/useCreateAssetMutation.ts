import { useMutation } from "@tanstack/react-query";
import {AuthAPI} from "../client";
 const createAsset = async(formdata)=>{
    
    const {data} = await AuthAPI().post("/user/createassets",formdata);
    return data
}
export const useCreateGoalMutation = () => {
  return useMutation({
    mutationFn: createAsset,
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};