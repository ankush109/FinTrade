import { useQuery } from "@tanstack/react-query";
import AuthAPI from "../client";

 const getassets = async()=>{
  const {data} = await AuthAPI().get("/user/getassets");
  return data
}
  export const getmyassets = () =>
    useQuery({
      queryKey: ["get-my-assets"],
      queryFn: () => getassets(),
      select: (data) => {
        const res = data;
        return res;
      },
    });
