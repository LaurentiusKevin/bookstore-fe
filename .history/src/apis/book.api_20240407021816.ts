import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";

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
