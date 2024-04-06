import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";

export async function tagListAPI() {
  return await axiosInstance
    .get(`/tags`)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
}
