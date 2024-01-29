export type PageResponse<T> = {
  readonly count: number;
  readonly total: number;
  readonly data: T[];
};
