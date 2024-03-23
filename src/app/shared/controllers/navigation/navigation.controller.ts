import { Injectable, Self } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Event, NavigationEnd, Params, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, shareReplay, takeUntil, tap } from 'rxjs';
import { NavigationParam } from '../../types';
import { WebRouteUtils } from '../../utils';
import { DestroyState } from '../../states';

export type NavigationControllerKey = {
  url: string;
  urlAfterRedirects: string;
  params: Params;
};

export const MAX_HISTORY_ITEMS = 12;

@Injectable({
  providedIn: 'root',
})
export class NavigationController extends Observable<NavigationControllerKey> {
  public readonly history$: Observable<NavigationParam[]>;
  private _history$ = new BehaviorSubject<NavigationParam[]>([]);

  public constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _location: Location,
    @Self() private readonly _destroyState$: DestroyState
  ) {
    super((subscriber) => {
      this._routerEvents$()
        .pipe(
          tap((navigation) => {
            const route = WebRouteUtils.toRoute(navigation.url.substring(1));

            if (!route) {
              return;
            }

            const currentHistory = this.history;

            if (!currentHistory.length) {
              this.updateNavigation(route);
              return;
            }

            const lastHistoryItem = currentHistory[currentHistory.length - 1];
            const isWebRoute = WebRouteUtils.isWebRoute(lastHistoryItem);

            if (isWebRoute && lastHistoryItem === route) {
              return;
            }

            if (!isWebRoute && lastHistoryItem.route === route) {
              return;
            }

            this.updateNavigation(route);
          }),
          takeUntil(this._destroyState$)
        )
        .subscribe(subscriber);
    });
    this.history$ = this._history$.asObservable();
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
      if (WebRouteUtils.isWebRoute(param)) {
        const navigate = await this._router.navigate([param]);

        if (navigate) {
          this.updateNavigation(param);
        }
        return navigate;
      }

      const { route, routePath, queryParams } = param;
      const commands: string[] = routePath ? [route, routePath] : [route];

      const navigate = await this._router.navigate(
        commands,
        queryParams && { queryParams: queryParams }
      );
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

  private _routerEvents$() {
    return this._router.events.pipe(
      filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd && !!e.url),
      map((e) => ({ url: e.url, urlAfterRedirects: e.urlAfterRedirects })),
      map((event) => {
        return {
          url: event.url,
          urlAfterRedirects: event.urlAfterRedirects,
          params: this._activatedRoute.snapshot.params,
        };
      }),
      shareReplay(1)
    );
  }

  private updateNavigation(param: NavigationParam): void {
    let currentHistory = this.history;

    if (currentHistory.length >= MAX_HISTORY_ITEMS) {
      currentHistory = currentHistory.slice(1);
    }

    this._history$.next([...currentHistory, param]);
  }
}
