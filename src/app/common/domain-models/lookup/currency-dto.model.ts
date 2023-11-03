import {CountryDto} from "./country-dto.model";
import {KeysMap} from "../../../core/types";
import {ObjectUtils} from "../../../core/utils";

interface CurrencyDto {
  id: number;
  type: string;
  code: string;
  name: string;
  symbol: string;
  countries: CountryDto[];
}

const currencyKeysMap: KeysMap<CurrencyDto, boolean> = {
  id: true,
  type: true,
  code: true,
  name: true,
  symbol: true,
  countries: true
};

function isCurrencyDto(value: unknown): value is CurrencyDto {
  return ObjectUtils.hasKeys(value, currencyKeysMap) && Array.isArray(value.countries);
}

export {CurrencyDto, isCurrencyDto};
