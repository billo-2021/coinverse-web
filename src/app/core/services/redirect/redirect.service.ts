import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { NavigationService } from '../navigation/navigation.service';
import { Params, Router } from '@angular/router';
import { NavigationParam, WebRoutesConfigType } from '../../types';
import { webRoutesConfig } from '../../../common/config/web-routes-config';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private readonly _redirectUrl$: Observable<{
    url: string;
    urlAfterRedirects: string;
    params: Params;
  }>;

  public constructor(
    private readonly _router: Router,
    private readonly _navigationService: NavigationService
  ) {
    this._redirectUrl$ = this._navigationService.navigation$.pipe(
      filter((navigation) => navigation.url !== navigation.urlAfterRedirects),
      tap((navigation) => {
        console.log('Navigation service Params', this.route);
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
      })
    );
  }

  private _route = new BehaviorSubject<WebRoutesConfigType | null>(null);

  public get route(): WebRoutesConfigType | null {
    return this._route.getValue();
  }

  public set route(routeConfig: WebRoutesConfigType) {
    this._route.next(routeConfig);
  }

  public get redirectUrl$(): Observable<Params> {
    return this._redirectUrl$;
  }

  public redirect(fallbackParam: NavigationParam): void {
    this._navigationService.to(this.route || fallbackParam).then();
    this._route.next(null);
  }
}
