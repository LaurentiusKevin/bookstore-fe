export interface RegisterApiParams {
  username: string;
  password: string;
  name: string;
}

export interface SnackbarParams {
  color: string;
  content: string;
}

export interface LoginApiParams {
  username: string;
  password: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface FormBook {
  id: number;
  title: string;
  writer: number;
  cover_image: string;
  point: number;
  tag: string[];
}

export interface WriterListParams {
  id: number;
  name: string;
}

export interface TagListParams {
  id: number;
  title: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  iat: string;
  exp: string;
}

export interface Book {
  title: string;
  cover_image: string;
  point: number;
}

export interface Writer {
  id: number;
  name: string;
}

export interface BookCreateParams {
  book: Book;
  tags: string[];
  writer: Writer;
}
