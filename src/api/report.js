import axios from "../axiosConfig";

export const apiReport = (token) =>
  axios({
    url: "report",
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
