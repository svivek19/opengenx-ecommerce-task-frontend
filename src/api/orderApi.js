import axios from "./axios";

export const placeOrder = async (orderData) => {
  const res = await axios.post("/order", orderData);
  return res.data;
};

export const getUserOrders = async (userId) => {
  const res = await axios.get(`/order/${userId}`);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await axios.patch(`/order/${id}`, { status });
  return data;
};

export const fetchAllOrders = async () => {
  const { data } = await axios.get("/order");
  return data;
};
