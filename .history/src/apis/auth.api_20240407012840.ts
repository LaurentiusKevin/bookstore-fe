import { RegisterApiParams } from "@/interfaces";
import axiosInstance from "./axios-instance";
import { AxiosResponse } from "axios";

export async function registerAPI(params: RegisterApiParams) {
  return await axiosInstance
    .post("/auth/register", params)
    .then((response: AxiosResponse) => {
      return response;
    });
}
