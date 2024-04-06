import { RegisterApiParams } from "@/interfaces";
import axiosInstance from "./axios-instance";
import { AxiosError, AxiosResponse } from "axios";

export async function registerAPI(params: RegisterApiParams) {
  return await axiosInstance
    .post("/auth/register", params)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
}

export async function loginAPI(params: RegisterApiParams) {
  return await axiosInstance
    .post("/auth/login", params)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
}
