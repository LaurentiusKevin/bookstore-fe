import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";

export async function writerListAPI() {
  return await axiosInstance
    .get(`/book`)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
}
