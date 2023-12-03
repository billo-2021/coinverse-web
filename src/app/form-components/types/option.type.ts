export type Option<T> = {
  readonly code: string;
  readonly name: string;
  readonly avatar?: string;
  value: T;
};
