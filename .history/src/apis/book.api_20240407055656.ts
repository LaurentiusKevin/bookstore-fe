import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";
import { BookCreateParams, PaginationParams } from "@/interfaces";

export async function bookListAPI(params: PaginationParams) {
  let tagsQuery = "";
  if (params.tags && params.tags?.length > 0) {
    params.tags.forEach((item) => {
      tagsQuery = "&tags=" + item;
    });
  }

  let writersQuery = "";
  if (params.writers && params.writers?.length > 0) {
    params.writers.forEach((item) => {
      writersQuery = "&writers=" + item;
    });
  }

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
    .post(`/user-purchase`, { book_id: book_id })
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return null;
    });
}
