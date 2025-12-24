import axios from "./axios";

export const fetchProducts = async () => {
  const res = await axios.get("/product");
  return res.data;
};
