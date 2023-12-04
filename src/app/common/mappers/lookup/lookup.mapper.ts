import { ObjectKeysMap, ObjectUtils } from '../../../core';

import {
  CountryDto,
  CountryResponse,
  CryptoCurrencyDto,
  CryptoCurrencyResponse,
  CurrencyDto,
  CurrencyResponse,
} from '../../domain-models/lookup';

type CurrencyKeys = 'id' | 'type' | 'code' | 'name' | 'symbol';

type CurrencyDtoType = Pick<CurrencyDto, CurrencyKeys>;
type CurrencyResponseType = Pick<CurrencyResponse, CurrencyKeys>;

const countryKeysMap: ObjectKeysMap<CountryDto, CountryResponse> = {
  id: 'id',
  code: 'code',
  name: 'name',
};

const currencyKeysMap: ObjectKeysMap<CurrencyDtoType, CurrencyResponseType> = {
  id: 'id',
  type: 'type',
  code: 'code',
  name: 'name',
  symbol: 'symbol',
};

function countryDtoToCountryResponse(countryDto: CountryDto): CountryResponse {
  return ObjectUtils.map(countryKeysMap, countryDto);
}

function currencyDtoToCurrencyResponse(currencyDto: CurrencyDto): CurrencyResponse {
  const countriesDto: CountryDto[] = currencyDto.countries;

  const countriesResponse = countriesDto.map((countryDto) =>
    ObjectUtils.map<CountryDto, CountryResponse>(countryKeysMap, countryDto)
  );

  const currencyResponse = ObjectUtils.map<CurrencyDtoType, CurrencyResponseType>(
    currencyKeysMap,
    currencyDto
  );

  return {
    ...currencyResponse,
    countries: countriesResponse,
  };
}

function cryptoCurrencyDtoToCryptoCurrencyResponse(
  cryptoCurrencyDto: CryptoCurrencyDto
): CryptoCurrencyResponse {
  const cryptoCurrencyKeysMap: ObjectKeysMap<CryptoCurrencyDto, CryptoCurrencyResponse> = {
    id: 'id',
    code: 'code',
    name: 'name',
    symbol: 'symbol',
    circulatingSupply: 'circulatingSupply',
  };

  return ObjectUtils.map(cryptoCurrencyKeysMap, cryptoCurrencyDto);
}

export {
  countryDtoToCountryResponse,
  currencyDtoToCurrencyResponse,
  cryptoCurrencyDtoToCryptoCurrencyResponse,
};
