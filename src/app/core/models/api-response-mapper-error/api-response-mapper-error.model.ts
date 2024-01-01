export class ApiResponseMapperError extends Error {
  private readonly _expected: string;
  private readonly _actual: string;

  public constructor(expected: string, actual: string) {
    super(`Expected: ${expected}, but got: ${actual}`);
    this._expected = expected;
    this._actual = actual;
  }

  public get expected(): string {
    return this._expected;
  }

  public get actual(): string {
    return this._actual;
  }
}
