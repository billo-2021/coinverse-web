export type Log = {
  readonly type: 'error' | 'info';
  readonly message: string;
  readonly options: unknown;
};
