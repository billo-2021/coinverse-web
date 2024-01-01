import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Mapper } from '@dynamic-mapper/angular';

import { PageRequest, PageResponse } from '../../../core';
import { ApiCrudClient } from '../../../common';

import { Wallet, WalletDto } from '../../models/wallet';
import { MappingProfile } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(
    private readonly _apiCrudClient: ApiCrudClient,
    private readonly _mapper: Mapper
  ) {}

  public getBalances(pageRequest: PageRequest): Observable<PageResponse<Wallet>> {
    return this._apiCrudClient
      .findMany<PageResponse<WalletDto>>(
        'balances',
        pageRequest,
        this._mapper.map(MappingProfile.WalletPageDtoToWalletPage, walletPage)
      )
      .pipe(
        map((walletPage) => this._mapper.map(MappingProfile.WalletPageDtoToWalletPage, walletPage))
      );
  }
}
