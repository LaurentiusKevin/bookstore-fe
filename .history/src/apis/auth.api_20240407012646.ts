import axiosInstance from "./axios-instance";

export async function registerAPI(params: type) {
  return await axiosInstance.post("/");
}
