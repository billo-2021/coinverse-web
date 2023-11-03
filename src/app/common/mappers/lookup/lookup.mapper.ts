import {
  CountryDto,
  CountryResponse,
  CryptoCurrencyDto,
  CryptoCurrencyResponse,
  CurrencyDto,
  CurrencyPairDto,
  CurrencyResponse
} from "../../domain-models";
import {ObjectKeysMap} from "../../../core/types";
import {ObjectUtils} from "../../../core/utils";
import {CurrencyPairResponse} from "../../domain-models/lookup/currency-pair-response";

type CurrencyKeys = 'id' | 'type' | 'code' | 'name' | 'symbol';

type CurrencyDtoType = Pick<CurrencyDto, CurrencyKeys>;
type CurrencyResponseType = Pick<CurrencyResponse, CurrencyKeys>;

const countryKeysMap: ObjectKeysMap<CountryDto, CountryResponse> = {
  id: 'id',
  code: 'code',
  name: 'name'
};

const currencyKeysMap: ObjectKeysMap<CurrencyDtoType, CurrencyResponseType> = {
  id: 'id',
  type: 'type',
  code: 'code',
  name: 'name',
  symbol: 'symbol'
};

type CurrencyPairKeys = 'id' | 'type' | 'name';
type CurrencyPairDtoType = Pick<CurrencyPairDto, CurrencyPairKeys>;
type CurrencyPairResponseType = Pick<CurrencyPairResponse, CurrencyPairKeys>;

function countryDtoToCountryResponse(countryDto: CountryDto): CountryResponse {
  return ObjectUtils.map(countryKeysMap, countryDto);
}

function currencyDtoToCurrencyResponse(currencyDto: CurrencyDto): CurrencyResponse {
  const countriesDto: CountryDto[] = currencyDto.countries;

  const countriesResponse = countriesDto.map((countryDto) =>
    ObjectUtils.map<CountryDto, CountryResponse>(countryKeysMap, countryDto)
  );

  const currencyResponse = ObjectUtils.map<CurrencyDtoType, CurrencyResponseType>(currencyKeysMap, currencyDto);

  return {
    ...currencyResponse,
    countries: countriesResponse
  };
}

function cryptoCurrencyDtoToCryptoCurrencyResponse(cryptoCurrencyDto: CryptoCurrencyDto): CryptoCurrencyResponse {
  const cryptoCurrencyKeysMap: ObjectKeysMap<CryptoCurrencyDto, CryptoCurrencyResponse> = {
    id: 'id',
    code: 'code',
    name: 'name',
    symbol: 'symbol',
    circulatingSupply: 'circulatingSupply'
  }

  return ObjectUtils.map(cryptoCurrencyKeysMap, cryptoCurrencyDto);
}

// function mapCurrencyPairDtoToCurrencyPairResponse(currencyPairDto: CurrencyPairDto): CurrencyPairResponse {
//   const baseCurrencyDto = currencyPairDto.baseCurrency;
//   const quoteCurrencyDto = currencyPairDto.quoteCurrency;
//
//   const currencyPairKeysMap: ObjectKeysMap<CurrencyPairDtoType, CurrencyPairResponseType> = {
//     type: 'type',
//     name: 'name'
//   };
//
//   return {
//     baseCurrency: ObjectUtils.map(currencyKeysMap, baseCurrencyDto),
//     q
//   }
// }

export {countryDtoToCountryResponse, currencyDtoToCurrencyResponse, cryptoCurrencyDtoToCryptoCurrencyResponse};
