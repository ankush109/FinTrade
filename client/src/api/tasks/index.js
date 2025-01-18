import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
export const startMyTask = async () => {
  const response = await api.post(
    `/user/start-taskset/
6680581e5b09fe86512f1789
`
  );
  return response.data;
};
export const getMyDailyTasks = async () => {
  const response = await api.get(`/user/get-taskset/
6680581e5b09fe86512f1789
`);
  return response.data;
};
export const completeTask = async (id) => {
  const response = await api.post(`/user/complete-task/${id}`);
  return response.data;
};
export const getMyDailyTaskQuery = () =>
  useQuery({
    queryKey: ["get-my-tasks"],
    queryFn: () => getMyDailyTasks(),
    select: (data) => {
      const res = data;
      return res;
    },
  });
