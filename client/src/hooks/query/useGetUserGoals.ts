import { useQuery } from "@tanstack/react-query";
import {AuthAPI} from "../client";

export const getgoals = async()=>{
  const {data} = await AuthAPI().get("/user/getgoals");
  return data
}


export const useGetUserGoalsQuery = () =>
  useQuery({
    queryKey: ["get-my-goals"],
    queryFn: () => getgoals(),
    select: (data) => {
      const res = data;
      return res;
    },
  });