import { useQuery } from "@tanstack/react-query";
import AuthAPI from "../client";

const getUserChats = async () => {
  const { data } = await AuthAPI().get("/user/get-ai-chats");
  return data;
};
const useGetUserChatsQuery = () =>
  useQuery({
    queryKey: ["user-chats"],
    queryFn: () => getUserChats(),
    select: (data) => {
      const res = data.message;
      return res;
    },
  });

export { useGetUserChatsQuery };
