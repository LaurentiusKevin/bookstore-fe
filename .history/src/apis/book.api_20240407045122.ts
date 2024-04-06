import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";
import { BookCreateParams, PaginationParams } from "@/interfaces";

export async function bookListAPI(params: PaginationParams) {
  return await axiosInstance
    .get(`/book?page=${params.page || 1}&pageSize=${params.pageSize || 10}`)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
}

export async function bookCreateAPI(params: BookCreateParams) {
  return await axiosInstance
    .post(`/book`, params)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
}

export async function bookPurchaseAPI(book_id: number) {
  return await axiosInstance
    .post(`/user-purchase`, { params })
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
}
