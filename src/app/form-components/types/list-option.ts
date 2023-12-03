type ListOptionType = {
  readonly code: string;
  readonly name: string;
};

class ListOption<T> {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly value: T,
    public readonly avatar: string | null = null
  ) {}

  public toString(): string {
    return `${this.code} ${this.name}`;
  }
}

export { ListOptionType, ListOption };
