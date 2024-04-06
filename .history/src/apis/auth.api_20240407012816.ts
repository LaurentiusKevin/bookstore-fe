import { RegisterApiParams } from "@/interfaces";
import axiosInstance from "./axios-instance";

export async function registerAPI(params: RegisterApiParams) {
  return await axiosInstance.post("/auth/register", params);
}
