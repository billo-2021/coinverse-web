import {Component, Inject} from '@angular/core';
import {map, Observable} from "rxjs";
import {WalletResponse} from "../../../../common/domain-models/wallet";
import {Router} from "@angular/router";
import {LoadingService} from "../../../../core/services/loading/loading.service";
import {WalletService} from "../../../../common/domain-services";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  protected wallets$: Observable<readonly WalletResponse[]>;
  protected labels$: Observable<string[]>;
  protected values$: Observable<number[]>;
  protected currencyCodes$: Observable<string[]>;
  protected total$: Observable<number>;

  public constructor(@Inject(Router) private readonly router: Router,
                     @Inject(LoadingService) private readonly loadingService: LoadingService,
                     @Inject(WalletService) private readonly walletService: WalletService) {
    this.wallets$ = walletService.getBalances({page: 0, size: 100})
      .pipe(map(walletPageResponse => {
        return walletPageResponse.data
          .sort((a, b) => b.balance - a.balance)
          .slice(0, 5);
      }));

    this.labels$ = this.wallets$.pipe(map(wallets => {
      return wallets.map(wallet => wallet.currency.name);
    }));

    this.values$ = this.wallets$.pipe(map(wallets => {
      return wallets.map(wallet => wallet.balance);
    }));

    this.currencyCodes$ = this.wallets$.pipe(map(wallets => {
      return wallets.map(wallet => wallet.currency.symbol);
    }));

    this.total$ = this.wallets$.pipe(map(wallets => {
      return wallets.reduce((total, current) => {
        return total + current.balance;
      }, 0);
    }));
  }
}
