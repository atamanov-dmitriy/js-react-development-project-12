import axios from "axios";
import type { User } from "./auth.types";

const postLogin = async (data: User) => {
  const response = await axios.post("/api/v1/login", data);

  return response.data;
};

const postCreateUser = async (data: User) => {
  const response = await axios.post("/api/v1/signup", data);

  return response.data;
};

export { postLogin, postCreateUser };
