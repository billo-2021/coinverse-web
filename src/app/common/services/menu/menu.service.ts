import { Inject, Injectable } from '@angular/core';
import { MenuItem } from '../../types';
import { BehaviorSubject, filter, map, Observable, startWith, tap } from 'rxjs';
import { TuiBreakpointService } from '@taiga-ui/core';
import { ModeType } from '../../../ui-components/components/menu/types';
import { menuItemsToken } from '../../config';
import { UserPermissionsService } from '../user-permissions/user-permissions.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly _isSideMenuShown = new BehaviorSubject(false);
  private readonly _isSideMenuShown$ = this._isSideMenuShown.asObservable();
  private readonly _isMenuShown = new BehaviorSubject(false);
  private readonly _isMenuShown$ = this._isMenuShown.asObservable();

  constructor(
    @Inject(TuiBreakpointService)
    private readonly tuiBreakpoint: TuiBreakpointService,
    @Inject(menuItemsToken) private readonly _menuItems: MenuItem[],
    @Inject(UserPermissionsService)
    private readonly _userPermissionsService: UserPermissionsService
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
