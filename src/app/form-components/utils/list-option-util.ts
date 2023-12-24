import { ListOption, ListOptionType } from '../types';

function toListOption<T extends ListOptionType>(data: T): ListOption<T> {
  return {
    code: data.code,
    name: data.name,
    avatar: data.code,
    value: data,
  };
}

const ListOptionUtils = {
  toListOption,
};
export { ListOptionUtils };
