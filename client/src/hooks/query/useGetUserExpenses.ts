import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../client";


const getexpense = async () => {
  const { data } = await AuthAPI().get("/finance/getexpense");
  return data;
};

const getExpenseCategories = async () => {
  const { data } = await AuthAPI().get("/finance/get-expenses-categories");
  return data;
};
export const useGetUserExpenseQuery = () =>
  useQuery({
    queryKey: ["get-my-expense"],
    queryFn: () => getexpense(),
    select: (data) => {
      const res = data;
      return res;
    },
  });
export const useGetUserExpenseQuerycategories = () =>
  useQuery({
    queryKey: ["get-my-expense-categories"],
    queryFn: () => getExpenseCategories(),
    select: (data) => {
      const res = data;
      return res;
    },
  });