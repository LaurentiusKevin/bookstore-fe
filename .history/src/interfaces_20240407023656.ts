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
  writer_id: number;
  cover_image: string;
  point: number;
}
