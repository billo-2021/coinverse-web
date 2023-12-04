import { Injectable, Self } from '@angular/core';
import { Params, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable, takeUntil, tap } from 'rxjs';

import {
  NavigationParam,
  NavigationService,
  webRoutesConfig,
  WebRoutesConfigType,
} from '../../../common';

import { DestroyService } from '../destroy/destroy.service';

type RedirectServiceKey = {
  url: string;
  urlAfterRedirects: string;
  params: Params;
};

@Injectable({
  providedIn: 'root',
})
export class RedirectService extends Observable<RedirectServiceKey> {
  public constructor(
    private readonly _router: Router,
    private readonly _navigationService: NavigationService,
    @Self() private readonly _destroy$: DestroyService
  ) {
    super((subscriber) => {
      this._navigationService
        .pipe(
          filter((navigation) => navigation.url !== navigation.urlAfterRedirects),
          tap((navigation) => {
            const redirectRoute = (
              Object.keys(webRoutesConfig) as Array<keyof typeof webRoutesConfig>
            ).find((webRoute) => webRoutesConfig[webRoute] === navigation.url);

            const currentRoute = (
              Object.keys(webRoutesConfig) as Array<keyof typeof webRoutesConfig>
            ).find((webRoute) => webRoutesConfig[webRoute] === navigation.urlAfterRedirects);

            if (typeof redirectRoute === 'undefined' || currentRoute !== 'login') {
              return;
            }

            this._route.next(redirectRoute);
          }),
          takeUntil(this._destroy$)
        )
        .subscribe(subscriber);
    });
  }

  private _route = new BehaviorSubject<WebRoutesConfigType | null>(null);

  public get route(): WebRoutesConfigType | null {
    return this._route.getValue();
  }

  public set route(routeConfig: WebRoutesConfigType) {
    this._route.next(routeConfig);
  }

  public redirect(fallbackParam: NavigationParam): void {
    this._navigationService.to(this.route || fallbackParam).then();
    this._route.next(null);
  }
}
