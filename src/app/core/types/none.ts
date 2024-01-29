export type None = null | undefined;

export function isNone<T>(value: T | None): value is None {
  return value === null || value == undefined;
}
