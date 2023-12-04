import { ObjectKeysMap, ObjectUtils } from '../../../core';

import { WalletDto, WalletResponse } from '../../domain-models/wallet';
import { cryptoCurrencyDtoToCryptoCurrencyResponse } from '../lookup';

type WalletKeys = 'id' | 'address' | 'balance';
type WalletType = Pick<WalletResponse, WalletKeys>;
type WalletDtoType = Pick<WalletDto, WalletKeys>;

function walletDtoToWalletResponse(walletDto: WalletDto): WalletResponse {
  const walletKeys: ObjectKeysMap<WalletDtoType, WalletType> = {
    id: 'id',
    address: 'address',
    balance: 'balance',
  };

  return {
    ...ObjectUtils.map(walletKeys, walletDto),
    currency: cryptoCurrencyDtoToCryptoCurrencyResponse(walletDto.currency),
  };
}

export { walletDtoToWalletResponse };
