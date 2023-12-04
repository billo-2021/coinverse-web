import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, shareReplay, startWith, tap } from 'rxjs';
import { TuiBreakpointService } from '@taiga-ui/core';

import { ModeType } from '../../../ui-components/components/menu/types';
import { MenuItem } from '../../types';
import { menuItemsToken } from '../../config';
import { UserPermissionsService } from '../user-permissions/user-permissions.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public readonly isMobile$: Observable<boolean>;
  private readonly _isSideMenuShown = new BehaviorSubject(false);
  private readonly _isSideMenuShown$ = this._isSideMenuShown.asObservable();
  private readonly _isMenuShown = new BehaviorSubject(false);
  private readonly _isMenuShown$ = this._isMenuShown.asObservable();

  constructor(
    private readonly _tuiBreakpointService: TuiBreakpointService,
    @Inject(menuItemsToken) private readonly _menuItems: MenuItem[],
    private readonly _userPermissionsService: UserPermissionsService
  ) {
    this.isMobile$ = this._tuiBreakpointService.pipe(
      startWith('mobile'),
      filter((mode): mode is ModeType => mode !== null),
      map((mode) => mode === 'mobile'),
      tap((isMobile) => isMobile && this.setIsSideMenuShown(false)),
      shareReplay(1)
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
    return this._userPermissionsService.menuItems;
  }

  public get menuItems$(): Observable<MenuItem[]> {
    return this._userPermissionsService.menuItems$;
  }

  public setIsSideMenuShown(isShown: boolean): void {
    this._isSideMenuShown.next(isShown);
  }

  public setIsMenuShown(isShown: boolean): void {
    this._isMenuShown.next(isShown);
  }
}
