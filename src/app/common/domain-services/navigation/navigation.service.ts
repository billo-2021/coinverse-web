import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Event, NavigationEnd, Router} from "@angular/router";
import {filter, map, Observable, shareReplay, Subject} from "rxjs";
import {RouteType} from "../../types/route";

type NavigationPage<T = undefined> = {
  path: string;
  params?: T;
};

type NavigationParams = {
  [key: string]: any;
};

type NavigationRoute = {
  url: string;
  params: NavigationParams;
};


@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public readonly navigation$: Observable<NavigationRoute> = this.router.events.pipe(
    filter((e: Event): e is NavigationEnd =>
      e instanceof NavigationEnd && !!e.url), map((e) => e.url),
    map((url) => {
      return {
        url,
        params: this.activatedRoute.snapshot.params
      }
    }),
    shareReplay(1)
  );

  private readonly MAX_HISTORY_ITEMS = 12;
  private readonly currentRoute = new Subject<NavigationRoute>();
  public readonly currentRoute$ = this.currentRoute.asObservable();

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  private _history: NavigationRoute[] = [];

  private readonly history$ = this.navigation$.subscribe(route => {
    if (this._history.length === this.MAX_HISTORY_ITEMS) {
      this._history = this._history.slice(1);
    }

    this.currentRoute.next(route);
    this._history.push(route);
  });

  public get history(): NavigationRoute[] {
    return this._history;
  }

  public async to(route: RouteType): Promise<void> {
    // if ('params' in route) {
    //   return this.router.navigate([route.path], {queryParams: route.params});
    // }

    try {
      await this.router.navigate([route.path]);

    } catch (e) {
      console.error(e);
    }
  }

  public back(): void {
    this._history.pop();

    if (this._history.length > 0) {
      this.location.back();
    }
  }
}
