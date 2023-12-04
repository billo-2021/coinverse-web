import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';

import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { tuiWidthCollapse } from '@taiga-ui/core';

import {
  getUpdatedChanges,
  MenuService,
  NavigationService,
  SimpleChangesTyped,
  UserPrincipal,
} from '../../../common';

import { MenuComponentInput } from './types';
import { MenuViewModel } from './menu.view-model';

const DEFAULT_ANIMATION_DURATION = 250;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiWidthCollapse],
})
export class MenuComponent implements OnChanges {
  @Input() public animationDuration = DEFAULT_ANIMATION_DURATION;
  @Input() public user: UserPrincipal | null = null;

  private readonly _state$ = new BehaviorSubject<MenuComponentInput>({
    isMenuShown: false,
    animationDuration: this.animationDuration,
    user: this.user,
  });

  public constructor(
    private readonly _navigationService: NavigationService,
    private readonly _menuService: MenuService
  ) {}

  @Input()
  public set classNames(value: string) {
    this._classes = value;
  }

  private _classes = '';

  @HostBinding('class')
  protected get classes(): string {
    return `flex-col ${this._classes}`;
  }

  protected get viewModel$(): Observable<MenuViewModel> {
    return combineLatest([
      this._menuService.isMobile$,
      this._menuService.isMenuShown$,
      this._menuService.isSideMenuShown$,
      this._state$,
    ]).pipe(
      map(([isMobile, isMenuShown, isSideMenuShown, state]) => {
        return {
          ...state,
          isMobile: isMobile,
          isMenuShown: isMenuShown,
          isSideMenuShown: isSideMenuShown,
          sideMenuWidth: isMobile ? 0 : 12,
        };
      })
    );
  }

  public ngOnChanges(changes: SimpleChangesTyped<MenuComponentInput>): void {
    const nextState = getUpdatedChanges(changes);
    this._state$.next({ ...this._state$.value, ...nextState });
  }

  public onToggleMenu(open: boolean): void {
    this._menuService.setIsSideMenuShown(open);
  }

  public onClickOutside(open: boolean): void {
    if (this._menuService.isSideMenuShown) {
      this.onToggleMenu(open);
    }
  }
}
