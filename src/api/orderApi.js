import axios from "./axios";

export const placeOrder = async (orderData) => {
  const res = await axios.post("/order", orderData);
  return res.data;
};

export const getUserOrders = async (userId) => {
  const res = await axios.get(`/order/${userId}`);
  return res.data;
};
