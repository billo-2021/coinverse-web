import {ListOption, ListOptionType} from '../types';

function toListOption<T extends ListOptionType>(data: T): ListOption {
  return new ListOption(data.code, data.name, data);
}

const ListOptionUtils = {
  toListOption
}
export {ListOptionUtils};
