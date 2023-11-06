type ListOptionType = {
  code: string;
  name: string;
};

class ListOption {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly value: unknown,
    public readonly avatar: string | null = null
  ) {}

  public toString(): string {
    return `${this.code} ${this.name}`;
  }
}

export { ListOptionType, ListOption };
