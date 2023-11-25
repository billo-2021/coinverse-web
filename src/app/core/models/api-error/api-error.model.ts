export class ApiError extends Error {
  private readonly _code: number;
  private readonly _timeStamp: string;

  public constructor(message: string, code: number, timeStamp: string) {
    super(message);
    this._code = code;
    this._timeStamp = timeStamp;
  }

  public get code(): number {
    return this._code;
  }

  public get timeStamp(): string {
    return this._timeStamp;
  }
}
