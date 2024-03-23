import { Injectable, Self } from '@angular/core';
import { Params, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable, takeUntil, tap } from 'rxjs';
import { NavigationParam } from '../../types';
import { WebRoute } from '../../enums';
import { WebRouteUtils } from '../../utils';
import { DestroyState } from '../../states';
import { NavigationController } from '../../controllers';

export type RedirectServiceKey = {
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
    private readonly _navigationService: NavigationController,
    @Self() private readonly _destroy$: DestroyState
  ) {
    super((subscriber) => {
      this._navigationService
        .pipe(
          filter((navigation) => navigation.url !== navigation.urlAfterRedirects),
          tap((navigation) => {
            const redirectRoute = WebRouteUtils.toRoute(navigation.url);
            const currentRoute = WebRouteUtils.toRoute(navigation.urlAfterRedirects);

            if (!redirectRoute || currentRoute !== WebRoute.LOGIN) {
              return;
            }

            this._route.next(redirectRoute);
          }),
          takeUntil(this._destroy$)
        )
        .subscribe(subscriber);
    });
  }

  private _route = new BehaviorSubject<WebRoute | null>(null);

  public get route(): WebRoute | null {
    return this._route.getValue();
  }

  public set route(routeConfig: WebRoute) {
    this._route.next(routeConfig);
  }

  public redirect(fallbackParam: NavigationParam): void {
    this._navigationService.to(this.route ?? fallbackParam).then();
    this._route.next(null);
  }
}
