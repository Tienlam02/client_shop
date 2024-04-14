import axios from "../axiosConfig";

export const apiAuthAdmin = (token) =>
  axios({
    url: "user/adminAuth",
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const apiRegister = (data) =>
  axios({ url: "user/register", method: "post", data });
export const apiLogin = (data) =>
  axios({ url: "user/login", data, method: "post" });
export const apiGetCurrent = (token) =>
  axios({
    url: "user/current",
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const apiUpdateCart = (data, token) =>
  axios({
    url: "user/updateCart",
    data,
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const apiDeleteCart = (data, token) =>
  axios({
    url: "user/deleteCart",
    data,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const apiDecrementCart = (data, token) =>
  axios({
    url: "user/decrementCart",
    data,
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const apiIncrementCart = (data, token) =>
  axios({
    url: "user/incrementCart",
    data,
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const apiGetUsers = (token) =>
  axios({
    url: "user",
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const apiChangeRole = (data, token) =>
  axios({
    url: "user/changeRole",
    data,
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export const apiDeleteUserByAd = (data, token) =>
  axios({
    url: "user/delete-user",
    data,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
