export type PageRequest = {
  readonly page: number;
  readonly size: number;
  readonly sortBy?: string;
  readonly sortDirection?: 'asc' | 'desc';
};
