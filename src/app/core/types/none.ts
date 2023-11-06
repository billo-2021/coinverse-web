export type None = null | undefined;

function isNone<T>(value: T | None): value is None {
  return value === null || value == undefined;
}

export { isNone };
