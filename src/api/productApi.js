import axios from "./axios";

export const fetchProducts = async () => {
  const res = await axios.get("/product");
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post("/product", data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.patch(`/product/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`/product/${id}`);
};
