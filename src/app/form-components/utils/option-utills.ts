import { Option } from '../types';

type OptionWithoutValue<T> = Omit<Option<T>, 'value'>;

type OptionConstraint<
  T extends object,
  TKey extends keyof T,
  OKey extends keyof OptionWithoutValue<T>,
> = Record<OKey, T[TKey]> extends Pick<Option<T>, OKey>
  ? Record<keyof OptionWithoutValue<T>, TKey>
  : never;

function toOption<T extends object, TKey extends keyof T, OKey extends keyof OptionWithoutValue<T>>(
  data: T,
  keysMap: OptionConstraint<T, TKey, OKey>
): Option<T> {
  return {
    code: data[keysMap.code],
    name: data[keysMap.name],
    value: data,
  };
}

function toOptions<
  T extends object,
  TKey extends keyof T,
  OKey extends keyof OptionWithoutValue<T>,
>(data: T[], keysMap: OptionConstraint<T, TKey, OKey>) {
  return data.map((item) => toOption(item, keysMap));
}

const OptionUtils = {
  toOption: toOption,
  toOptions: toOptions,
};

export { OptionUtils };
