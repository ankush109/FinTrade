import { useQuery } from "@tanstack/react-query";
import AuthAPI from "../client";

const GetUser = async () => {
  const { data } = await AuthAPI().get("/user/user-details");
  return data;
};
const GetUserQuery = () =>
  useQuery({
    queryKey: ["user-details"],
    queryFn: () => GetUser(),
    select: (data) => {
      const res = data.message;
      return res;
    },
  });

export { GetUserQuery };
