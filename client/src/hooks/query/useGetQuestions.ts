import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../client";


const getAllquestionsInfo = async (searchText) => {
  searchText = searchText || "";
  console.log(searchText);

  try {
    const { data } = await AuthAPI().get(`/questions/get-allquestions`);
    console.log(data);
    return data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllquestionsInfoQuery = () =>
  useQuery({
    queryKey: ["questions"],
    queryFn: () => getAllquestionsInfo(""),
    select: (data) => {
      console.log(data);
      return data;
    },
  });