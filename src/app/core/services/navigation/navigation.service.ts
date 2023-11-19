import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Event, NavigationEnd, Params, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, shareReplay, tap } from 'rxjs';
import { NavigationParam } from '../../types';
import { webRoutesConfig } from '../../../common/config/web-routes-config';

const MAX_HISTORY_ITEMS = 12;

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly _navigation$: Observable<{ url: string; urlAfterRedirects: string; params: Params }>;

  public constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _location: Location
  ) {
    this._navigation$ = this._router.events.pipe(
      filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd && !!e.url),
      map((e) => ({ url: e.url, urlAfterRedirects: e.urlAfterRedirects })),
      map((event) => {
        return {
          url: event.url,
          urlAfterRedirects: event.urlAfterRedirects,
          params: this._activatedRoute.snapshot.params,
        };
      }),
      tap((navigation) => {
        const route = (Object.keys(webRoutesConfig) as Array<keyof typeof webRoutesConfig>).find(
          (webRoute) => webRoutesConfig[webRoute] === navigation.url.substring(1)
        );

        if (typeof route === 'undefined') {
          return;
        }

        const currentHistory = this.history;

        if (!currentHistory.length) {
          this.updateNavigation(route);
          return;
        }

        const lastHistoryItem = currentHistory[currentHistory.length - 1];

        if (typeof lastHistoryItem === 'string' && lastHistoryItem === route) {
          return;
        }

        if (typeof lastHistoryItem !== 'string' && lastHistoryItem.route === route) {
          return;
        }

        this.updateNavigation(route);
      }),
      shareReplay(1)
    );
  }

  public get navigation$(): Observable<{ url: string; urlAfterRedirects: string; params: Params }> {
    return this._navigation$;
  }

  private _history$: BehaviorSubject<NavigationParam[]> = new BehaviorSubject<NavigationParam[]>([]);

  public get history$(): Observable<NavigationParam[]> {
    return this._history$.asObservable();
  }

  public get history(): NavigationParam[] {
    return this._history$.getValue();
  }

  public get currentRoute(): NavigationParam | null {
    const currentHistory = this.history;

    return (currentHistory.length && currentHistory[currentHistory.length - 1]) || null;
  }

  public async to(param: NavigationParam): Promise<boolean> {
    try {
      if (typeof param === 'string') {
        const navigate = await this._router.navigate([webRoutesConfig[param]]);

        if (navigate) {
          this.updateNavigation(param);
        }
        return navigate;
      }

      const { route, routePath, queryParams } = param;
      const url = webRoutesConfig[route];
      const commands: string[] = routePath ? [url, routePath] : [url];

      const navigate = await this._router.navigate(commands, queryParams && { queryParams: queryParams });
      if (navigate) {
        this.updateNavigation(param);
      }

      return navigate;
    } catch (error) {
      console.error('Error occurred during navigation', error);
      return false;
    }
  }

  public back(): void {
    const historyUpdate = this._history$.getValue().slice(0, -1);

    this._history$.next(historyUpdate);

    if (historyUpdate.length > 0) {
      this._location.back();
    }
  }

  private updateNavigation(param: NavigationParam): void {
    let currentHistory = this.history;

    if (currentHistory.length >= MAX_HISTORY_ITEMS) {
      currentHistory = currentHistory.slice(1);
    }

    this._history$.next([...currentHistory, param]);
  }
}
