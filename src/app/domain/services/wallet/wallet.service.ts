import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest, PageResponse } from '../../../core';
import { ApiCrudClient } from '../../../common';
import { MappingProfile } from '../../config';
import { Wallet, WalletDto } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getBalances(pageRequest: PageRequest): Observable<PageResponse<Wallet>> {
    return this._apiCrudClient.findMany<WalletDto, Wallet>(
      'balances',
      pageRequest,
      MappingProfile.WalletDtoPageToWalletPage
    );
  }
}
