import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";

export async function latestPointAPI() {
  return await axiosInstance
    .get(`/point/latest`)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
}
