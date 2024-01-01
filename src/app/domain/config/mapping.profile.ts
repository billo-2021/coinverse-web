import { MappingPair, Profile } from '@dynamic-mapper/mapper';

import { PageResponse } from '../../core';

import { Wallet, WalletDto } from '../models/wallet';

export class MappingProfile extends Profile {
  public static readonly WalletDtoToWallet = new MappingPair<WalletDto, Wallet>();
  public static readonly WalletPageDtoToWalletPage = new MappingPair<
    PageResponse<WalletDto>,
    PageResponse<Wallet>
  >();

  constructor() {
    super();

    this.createAutoMap(MappingProfile.WalletDtoToWallet, {});

    this.createAutoMap(MappingProfile.WalletPageDtoToWalletPage, {
      data: (opt) => opt.mapFromUsing((source) => source.data, MappingProfile.WalletDtoToWallet),
    });
  }
}
