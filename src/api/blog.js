import axios from "../axiosConfig";

export const apiGetBlogs = (params) =>
  axios({ url: "blog", params, method: "get" });
export const apiGetBlog = (id) => axios({ url: `blog/${id}`, method: "get" });
export const apiCreateBlog = (data, token) =>
  axios({
    url: "blog",
    method: "post",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const apiDeleteBlog = (data, token) =>
  axios({
    url: "blog",
    method: "delete",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const apiCreateComment = (data, token) =>
  axios({
    url: "blog/comment",
    method: "post",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
