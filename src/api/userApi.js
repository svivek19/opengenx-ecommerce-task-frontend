import axios from "./axios";

export const fetchUsers = async () => {
  const { data } = await axios.get("/auth/users");
  return data;
};
