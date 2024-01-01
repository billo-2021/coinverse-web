import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, startWith, tap } from 'rxjs';

import { NavigationService } from '../../../common';
import { PaymentResponse } from '../../../common/domain-models/transact';

import { PaymentModel } from '../models';
import { Tabs, TransactSteps, TransactViewModel } from '../pages';

@Injectable({
  providedIn: 'root',
})
export class TransactViewModelService extends Observable<TransactViewModel> {
  protected activeTabIndex$ = new BehaviorSubject<Tabs>(Tabs.DEPOSIT);
  protected currentStepIndex$ = new BehaviorSubject<TransactSteps>(TransactSteps.TRANSACT_REQUEST);
  protected readonly currencyCode$ = new BehaviorSubject<string | null>(null);
  protected readonly paymentModel$ = new BehaviorSubject<PaymentModel | null>(null);
  protected readonly paymentResponse$ = new BehaviorSubject<PaymentResponse | null>(null);

  protected readonly _stream: Observable<TransactViewModel> = combineLatest([
    this.activeTabIndex$.asObservable(),
    this.currentStepIndex$.asObservable(),
    this.currencyCode$.asObservable(),
    this.paymentModel$.asObservable(),
    this.paymentResponse$.asObservable(),
  ]).pipe(
    map(([activeTabIndex, currentStepIndex, currencyCode, paymentModel, paymentResponse]) => ({
      activeTabIndex,
      currentStepIndex,
      currencyCode,
      paymentModel,
      paymentResponse,
    }))
  );

  constructor(private readonly _navigationService: NavigationService) {
    super((subscriber) => this._stream.subscribe(subscriber));

    this._navigationService.queryParam('action').pipe(
      startWith(null),
      tap((paramValue) => {
        if (!paramValue) {
          return;
        }

        const tabIndex = 'withdraw'.includes(paramValue.toLowerCase()) ? 1 : 0;
        this.activeTabIndex$.next(tabIndex);
      })
    );

    this._navigationService
      .queryParam('currencyCode')
      .pipe(tap((paramValue) => this.currencyCode$.next(paramValue)));
  }

  public set activeTabIndex(index: Tabs) {
    this.activeTabIndex$.next(index);
  }

  public set currentStepIndex(step: TransactSteps) {
    this.currentStepIndex$.next(step);
  }

  public get currencyCode(): string | null {
    return this.currencyCode$.value;
  }

  public get paymentModel(): PaymentModel | null {
    return this.paymentModel$.value;
  }

  public set paymentModel(value: PaymentModel) {
    this.paymentModel$.next(value);
  }

  public get paymentResponse(): PaymentResponse | null {
    return this.paymentResponse$.value;
  }

  public set paymentResponse(value: PaymentResponse) {
    this.paymentResponse$.next(value);
  }
}
