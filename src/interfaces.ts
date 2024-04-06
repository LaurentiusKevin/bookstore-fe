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
  tags?: string[];
  writers?: string[];
}

export interface FormBook {
  id: number;
  title: string;
  writer: string;
  cover_image: string;
  point: number;
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
  name: string;
}

export interface BookCreateParams {
  book: Book;
  tags: string[];
  writer: Writer;
}

export interface BookTags {
  id: string;
  book_id: string;
  tag_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  book_tags: BookTags;
}

export interface BookResponse {
  id: string;
  title: string;
  writer_id: string;
  createdBy: string;
  cover_image: string;
  point: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  writer: Writer;
}
