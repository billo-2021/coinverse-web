export type ListOptionType = {
  readonly code: string;
  readonly name: string;
};

export type ListOption<T> = {
  readonly code: string;
  readonly name: string;
  readonly avatar: string;
  readonly value: T;
};
