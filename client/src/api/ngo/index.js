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

export const createEvent = async (eventinfo) => {
  // console.log("event ", eventinfo);
  const { data } = await api.post("/user/create-event", eventinfo);
  // console.log("ngo index.js", data);
  return data;
};

export const getAllEvents = async () => {
  const { data } = await api.get("/user/get-allevents");
  return data;
};

export const fetchevents = () =>
  useQuery({
    queryKey: ["get-all-events"],
    queryFn: () => getAllEvents(),
    select: (data) => {
      const res = data;

      console.log("Data1", res);

      return res;
    },
  });

export const registerEvent = async (id) => {
  const { data } = await api.post(`/user/event-register/${id}`);
  // console.log(data);
  return data;
};

export const getMyEvents = async () => {
  const { data } = await api.get("/user/get-myevents");
  console.log(data, "dataaa");
  return data;
};

export const fetchMyEvents = () =>
  useQuery({
    queryKey: ["get-my-events"],
    queryFn: () => getMyEvents(),
    select: (data) => {
      const res = data;

      console.log("Data1", res);

      return res;
    },
  });
