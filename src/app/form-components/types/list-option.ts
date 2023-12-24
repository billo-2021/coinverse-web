type ListOptionType = {
  readonly code: string;
  readonly name: string;
};

type ListOption<T> = {
  readonly code: string;
  readonly name: string;
  readonly avatar: string;
  readonly value: T;
};

export { ListOptionType, ListOption };
