import axios from "axios";

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

export default AuthAPI;
