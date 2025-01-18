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

const createTest = async (testData) => {
  const response = await api.post("/user/create-test", testData);
  return response.data;
};

const getAllTests = async () => {
  const response = await api.get("/user/get-alltest");
  return response.data;
};

const getMyTests = async () => {
  const response = await api.get("/user/get-mytest");
  return response.data;
};

const deleteTest = async (testId) => {
  const response = await api.delete(`/user/delete-test/${testId}`);
  return response.data;
};

export const fetchMyTests = () =>
  useQuery({
    queryKey: ["get-my-tests"],
    queryFn: () => getMyTests(),
    select: (data) => {
      const res = data;

      console.log("Data1", res);

      return res;
    },
  });

export const fetchAllTests = () =>
  useQuery({
    queryKey: ["get-all-tests"],
    queryFn: () => getAllTests(),
    select: (data) => {
      const res = data;
      return res;
    },
  });

export const createTestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(createTest, {
    onSuccess: () => {
      queryClient.invalidateQueries("allTests");
      queryClient.invalidateQueries("myTests");
    },
  });
};

export const deleteTestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTest, {
    onSuccess: () => {
      queryClient.invalidateQueries("allTests");
      queryClient.invalidateQueries("myTests");
    },
  });
};
