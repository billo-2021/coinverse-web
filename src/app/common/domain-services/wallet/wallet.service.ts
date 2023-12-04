import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpCrudService, PageRequest, PageResponse } from '../../../core';

import { apiRoutesConfig } from '../../config';
import { WalletDto, WalletResponse } from '../../domain-models/wallet';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  public readonly BASE_PATH = apiRoutesConfig.balances.root;

  constructor(private readonly _httpService: HttpCrudService) {}

  public getBalances(pageRequest: PageRequest): Observable<PageResponse<WalletResponse>> {
    const url = `${this.BASE_PATH}?pageNumber=${pageRequest.page}&pageSize=${pageRequest.size}`;
    return this._httpService.find<PageResponse<WalletDto>>(url);
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}
