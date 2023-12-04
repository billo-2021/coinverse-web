import { ObjectKeysMap, ObjectUtils } from '../../../core';

import {
  CurrencyExchangeRateDto,
  CurrencyExchangeRateDtoData,
  CurrencyExchangeRateResponse,
  CurrencyExchangeResponseData,
} from '../../domain-models/quote';

type CurrencyExchangeRateKeys = 'currencyPairName' | 'currencyPairType';

type CurrencyExchangeRateDtoType = Pick<CurrencyExchangeRateDto, CurrencyExchangeRateKeys>;
type CurrencyExchangeRateResponseType = Pick<
  CurrencyExchangeRateResponse,
  CurrencyExchangeRateKeys
>;

function currencyExchangeRateDtoToCurrencyExchangeRateResponse(
  currencyExchangeRateDto: CurrencyExchangeRateDto
): CurrencyExchangeRateResponse {
  const currencyExchangeRateDataDto = currencyExchangeRateDto.data;

  const currencyExchangeRateDataKeysMap: ObjectKeysMap<
    CurrencyExchangeRateDtoData,
    CurrencyExchangeResponseData
  > = {
    id: 'id',
    bidRate: 'bidRate',
    askRate: 'askRate',
    timeToLive: 'timeToLive',
    createdAt: 'createdAt',
  };

  const currencyExchangeRateDataResponse = currencyExchangeRateDataDto.map((data) =>
    ObjectUtils.map(currencyExchangeRateDataKeysMap, data)
  );

  const currencyExchangeRateKeysMap: ObjectKeysMap<
    CurrencyExchangeRateDtoType,
    CurrencyExchangeRateResponseType
  > = {
    currencyPairName: 'currencyPairName',
    currencyPairType: 'currencyPairType',
  };

  return {
    ...ObjectUtils.map(currencyExchangeRateKeysMap, currencyExchangeRateDto),
    data: currencyExchangeRateDataResponse,
  };
}

export { currencyExchangeRateDtoToCurrencyExchangeRateResponse };
