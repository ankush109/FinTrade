import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import {AuthAPI} from "../client";

 const createAsset = async(formdata)=>{
    
    const {data} = await AuthAPI().post("/user/creategoals",formdata);
    return data
}
export const useCreateGoalMutation = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAsset,
    onSuccess:(res) =>{
       queryClient.invalidateQueries({ queryKey: ["get-my-goals"] });
    },
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });
};