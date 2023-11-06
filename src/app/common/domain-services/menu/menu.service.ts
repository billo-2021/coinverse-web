import { Inject, Injectable } from '@angular/core';
import { Filter, MenuItem } from '../../types';
import { UserPrincipalStoreService } from '../user-principal-store/user-principal-store.service';
import { BehaviorSubject, filter, map, Observable, startWith, tap } from 'rxjs';
import { TuiBreakpointService } from '@taiga-ui/core';
import { ModeType } from '../../../ui-components/components/menu/types';
import { menuItemsToken } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly _isSideMenuShown = new BehaviorSubject(false);
  private readonly _isSideMenuShown$ = this._isSideMenuShown.asObservable();
  private readonly _isMenuShown = new BehaviorSubject(false);
  private readonly _isMenuShown$ = this._isMenuShown.asObservable();
  private readonly _menuFilter = new BehaviorSubject<Filter>({ type: 'none' });

  constructor(
    @Inject(TuiBreakpointService)
    private readonly tuiBreakpoint: TuiBreakpointService,
    @Inject(menuItemsToken) private readonly _menuItems: MenuItem[],
    @Inject(UserPrincipalStoreService)
    private readonly userPrincipalStore: UserPrincipalStoreService
  ) {}

  public get isMobile$(): Observable<boolean> {
    return this.tuiBreakpoint.pipe(
      startWith('mobile'),
      filter((mode): mode is ModeType => mode !== null),
      map((mode) => mode === 'mobile'),
      tap((isMobile) => isMobile && this.setIsSideMenuShown(false))
    );
  }

  public get isMenuShown$(): Observable<boolean> {
    return this._isMenuShown$;
  }

  public get isSideMenuShown$(): Observable<boolean> {
    return this._isSideMenuShown$;
  }

  public get isSideMenuShown(): boolean {
    return this._isSideMenuShown.value;
  }

  public get menuItems(): MenuItem[] {
    const filter = this._menuFilter.value;

    return (
      (filter.type === 'some' &&
        this._menuItems.filter(
          (menuItem) => !filter.values.some((filter) => menuItem.text === filter || menuItem.link === filter)
        )) ||
      (filter.type === 'all' &&
        this._menuItems.filter(
          (menuItem) =>
            !filter.values.every((filter) => !(menuItem.text === filter || menuItem.link === filter))
        )) ||
      this._menuItems
    );
  }

  public set menuFilter(menuFilter: Filter) {
    this._menuFilter.next(menuFilter);
  }

  public setIsSideMenuShown(isShown: boolean): void {
    this._isSideMenuShown.next(isShown);
  }

  public setIsMenuShown(isShown: boolean): void {
    this._isMenuShown.next(isShown);
  }
}
