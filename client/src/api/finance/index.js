
import { useQuery } from "@tanstack/react-query";
import AuthAPI from "../client";


export const createFinance = async (finance) => {
  const {data} = await AuthAPI().post("/user/finance/create",finance)
  return data
};

export const getFinance = async()=>{
  const {data} = await AuthAPI().get("/user/getfinance");
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
