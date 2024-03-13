import axios from "../axiosConfig";

export const apiGetProducts = (params) =>
  axios({ url: "product", params, method: "get" });
export const apiGetProduct = (params) =>
  axios({ url: `product/:${params.id}`, params, method: "get" });
export const apiCreateProduct = (data, token) =>
  axios({
    url: "product",
    method: "post",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const apiUpdateProduct = (data, token) =>
  axios({
    url: "product",
    method: "put",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const apiDeleteProduct = (_id, token) =>
  axios({
    url: "product",
    method: "delete",
    params: { _id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
