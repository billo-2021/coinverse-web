import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCrudClient, ApiRoute, PageRequest, PageResponse } from '../../../shared';
import { Wallet, WalletDto } from '../../models';
import { MappingProfile } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getBalances(pageRequest: PageRequest): Observable<PageResponse<Wallet>> {
    return this._apiCrudClient.findMany<WalletDto, Wallet>(
      ApiRoute.BALANCES,
      pageRequest,
      MappingProfile.WalletDtoPageToWalletPage
    );
  }
}
