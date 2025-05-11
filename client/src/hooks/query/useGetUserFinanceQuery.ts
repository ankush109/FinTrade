import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../client";


const getFinance = async()=>{
  const {data} = await AuthAPI().get("/finance/getfinance");
  return data
}

export const useGetUserFinanceQuery = () =>
  useQuery({
    queryKey: ["get-my-finance"],
    queryFn: () => getFinance(),
    select: (data) => {
      const res = data;
      return res;
    },
  });