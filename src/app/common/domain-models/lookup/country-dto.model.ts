import { KeysMap, ObjectUtils } from '../../../core';

interface CountryDto {
  id: number;
  code: string;
  name: string;
}

const countryKeysMap: KeysMap<CountryDto, boolean> = {
  id: true,
  code: true,
  name: true,
};

function isCountryDto(value: unknown): value is CountryDto {
  return ObjectUtils.hasKeys(value, countryKeysMap);
}

export { CountryDto, isCountryDto };
