import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";
import { PaginationParams } from "@/interfaces";

export async function bookListAPI(params: PaginationParams) {
  return await axiosInstance
    .post(
      `/book?page=${params.page || 1}&pageSize=${params.pageSize || 10}`,
      params
    )
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
}
