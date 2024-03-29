import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, shareReplay, startWith, tap } from 'rxjs';
import { TuiBreakpointService } from '@taiga-ui/core';
import { ModeType } from '../../../ui-components';
import { MenuItem } from '../../types';
import { UserPermissionsStore } from '../../stores';

@Injectable({
  providedIn: 'root',
})
export class MenuController {
  public readonly isMobile$: Observable<boolean>;
  private readonly _isSideMenuShown = new BehaviorSubject(false);
  private readonly _isSideMenuShown$ = this._isSideMenuShown.asObservable();

  constructor(
    private readonly _tuiBreakpointService: TuiBreakpointService,
    private readonly _userPermissionsService: UserPermissionsStore
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
    return this._userPermissionsService.isMenuShown$;
  }

  public get isSideMenuShown$(): Observable<boolean> {
    return this._isSideMenuShown$;
  }

  public get isSideMenuShown(): boolean {
    return this._isSideMenuShown.value;
  }

  public get menuItems(): readonly MenuItem[] {
    return this._userPermissionsService.menuItems;
  }

  public get menuItems$(): Observable<readonly MenuItem[]> {
    return this._userPermissionsService.menuItems$;
  }

  public setIsSideMenuShown(isShown: boolean): void {
    this._isSideMenuShown.next(isShown);
  }
}
