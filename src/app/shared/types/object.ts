export type ObjectKeysMap<K extends object, V> = {
  [Property in keyof K]: keyof V;
};

export type KeysMap<K extends object, V> = {
  [Property in keyof K]: V;
};
