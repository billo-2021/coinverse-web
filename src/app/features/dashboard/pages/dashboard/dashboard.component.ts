import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { LoadingService } from '../../../../core';
import { WalletService } from '../../../../common';
import { WalletResponse } from '../../../../common/domain-models/wallet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  protected wallets$: Observable<readonly WalletResponse[]>;
  protected labels$: Observable<string[]>;
  protected values$: Observable<number[]>;
  protected currencyCodes$: Observable<string[]>;
  protected total$: Observable<number>;
  @HostBinding('class') private _classes = 'block';

  public constructor(
    private readonly _router: Router,
    private readonly _loadingService: LoadingService,
    private readonly _walletService: WalletService
  ) {
    this.wallets$ = _walletService.getBalances({ page: 0, size: 100 }).pipe(
      map((walletPageResponse) => {
        return walletPageResponse.data.sort((a, b) => b.balance - a.balance).slice(0, 5);
      })
    );

    this.labels$ = this.wallets$.pipe(
      map((wallets) => {
        return wallets.map((wallet) => wallet.currency.name);
      })
    );

    this.values$ = this.wallets$.pipe(
      map((wallets) => {
        return wallets.map((wallet) => wallet.balance);
      })
    );

    this.currencyCodes$ = this.wallets$.pipe(
      map((wallets) => {
        return wallets.map((wallet) => wallet.currency.symbol);
      })
    );

    this.total$ = this.wallets$.pipe(
      map((wallets) => {
        return wallets.reduce((total, current) => {
          return total + current.balance;
        }, 0);
      })
    );
  }
}
