type PageResponse<T> = {
  count: number;
  total: number;
  data: T[];
}

export {PageResponse};
