import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AuthAPI = () => {
  if (typeof window !== "undefined") {
    return axios.create({
      baseURL: `http://localhost:4000/v1`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return axios.create({
      baseURL: `http://localhost:4000/v1`,
      headers: {
        authorization: `Bearer`,
        "Content-Type": "application/json",
      },
    });
  }
};

const api = AuthAPI();

export const createFinance = async (finance) => {
  const {data} = await api.post("/user/finance/create",finance)
  return data
};

export const getgoals = async()=>{
  const {data} = await api.get("/user/getgoals");
  return data
}
export const createGoal = async(formdata)=>{
    const {data} = await api.post("/user/creategoals",formdata);
    return data
}
  
export const getmygoals = () =>
  useQuery({
    queryKey: ["get-my-goal"],
    queryFn: () => getgoals(),
    select: (data) => {
      const res = data;
      return res;
    },
  });
