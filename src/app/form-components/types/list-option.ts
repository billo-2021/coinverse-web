export type ListOption<T> = {
  readonly code: string;
  readonly name: string;
  readonly avatar: string;
  readonly value: T;
};
