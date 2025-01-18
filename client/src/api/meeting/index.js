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
const getallmentors = async () => {
  const response = await api.get("/user/get-mentors");
  return response.data;
};
export const bookMeeting = async (meetinginfo) => {
  const { data } = await AuthAPI().post("/user/book-meeting", meetinginfo);
  return data;
};
const getMyRequestedMeetings = async () => {
  const { data } = await AuthAPI().get("/user/my-meetings");

  return data;
};
export const confirmMeeting = async (meetinginfo) => {
  const { data } = await AuthAPI().post("/user/confirm-meeting", meetinginfo);

  return data;
};
export const rejectMeeting = async (meetinginfo) => {
  const { data } = await AuthAPI().post("/user/reject-meeting", meetinginfo);

  return data;
};
const getMentorMeetings = async () => {
  const { data } = await AuthAPI().get("/user/get-meetings");

  return data;
};
export const Mymeetings = () =>
  useQuery({
    queryKey: ["meetings"],
    queryFn: () => getMyRequestedMeetings(),
    select: (data) => {
      console.log(data.message, "data");
      const res = data.message;
      return res;
    },
  });

export const MentorMeetings = () =>
  useQuery({
    queryKey: ["mentor-meeting"],
    queryFn: () => getMentorMeetings(),
    select: (data) => {
      console.log(data.message, "data");
      const res = data.message;
      return res;
    },
  });
export const fetchmentors = () =>
  useQuery({
    queryKey: ["get-all-mentors"],
    queryFn: () => getallmentors(),
    select: (data) => {
      const res = data;

      console.log("Data1", res);

      return res;
    },
  });
