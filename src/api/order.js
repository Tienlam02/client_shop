import axios from "../axiosConfig";

export const apiCreateOrder = (data, token) =>
  axios({
    url: "order",
    data,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const apiGetOrder = (token) =>
  axios({
    url: "order/user",
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const apiGetOrders = (token) =>
  axios({
    url: "order",
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const apiUpdateOrder = (data, token) =>
  axios({
    url: "order",
    data: { data },
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
