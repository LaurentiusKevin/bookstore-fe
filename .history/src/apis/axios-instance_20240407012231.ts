import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("token") || "";
  config.headers.authorization = accessToken;

  // if (isTokenExpired(accessToken)) {
  //   const newAccessToken = await getNewToken();

  //   config.headers.AuthToken = `${newAccessToken}`;
  // }

  return config;
});
