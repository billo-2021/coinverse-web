type ObjectKeysMap<K extends object, V> = {
  [Property in keyof K]: keyof V;
};

type KeysMap<K extends object, V> = {
  [Property in keyof K]: V;
};

export { ObjectKeysMap, KeysMap };
