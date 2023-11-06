import { Inject, Injectable } from '@angular/core';
import { HttpCrudService } from '../../../core/services';
import { apiRoutesConfig } from '../../config';
import { PageResponse } from '../../../core/types/crud';
import { WalletDto, WalletResponse } from '../../domain-models/wallet';
import { Observable } from 'rxjs';

interface PageRequest {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  public readonly BASE_PATH = apiRoutesConfig.balances.root;

  constructor(@Inject(HttpCrudService) private readonly httpService: HttpCrudService) {}

  public getBalances(pageRequest: PageRequest): Observable<PageResponse<WalletResponse>> {
    const url = `${this.BASE_PATH}?pageNumber=${pageRequest.page}&pageSize=${pageRequest.size}`;
    return this.httpService.find<PageResponse<WalletDto>>(url);
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}
