import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../../core/services';
import {tuiWidthCollapse} from '@taiga-ui/core';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {UserPrincipal} from '../../../common/domain-models';
import {MenuComponentInput} from './types';
import {MenuViewModel} from './menu.view-model';
import {getUpdatedChanges, SimpleChangesTyped} from '../../../common/utils';
import {MenuService} from "../../../common/domain-services/menu/menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiWidthCollapse],
  host: {'class': 'flex-col'}
})
export class MenuComponent implements OnChanges {
  @Input() public animationDuration = 250;
  @Input() public user: UserPrincipal | null = null;

  private readonly _state$ = new BehaviorSubject<MenuComponentInput>({
    isMenuShown: false,
    animationDuration: this.animationDuration,
    user: this.user
  });

  private readonly _viewModel$: Observable<MenuViewModel>;

  public constructor(private readonly navigationService: NavigationService,
                     @Inject(MenuService) private readonly menuService: MenuService) {

    this._viewModel$ = combineLatest([
      this.menuService.isMobile$,
      this.menuService.isMenuShown$,
      this.menuService.isSideMenuShown$,
      this._state$
    ]).pipe(map(([isMobile, isMenuShown, isSideMenuShown, state]) => {

      return {
        ...state,
        isMobile: isMobile,
        isMenuShown: isMenuShown,
        isSideMenuShown: isSideMenuShown,
        sideMenuWidth: isMobile ? 0 : 12
      };
    }));
  }

  protected get viewModel$() {
    return this._viewModel$;
  }

  public ngOnChanges(changes: SimpleChangesTyped<MenuComponentInput>): void {
    const nextState = getUpdatedChanges(changes);
    this._state$.next({...this._state$.value, ...nextState});
  }

  public onToggleMenu(open: boolean): void {
    this.menuService.setIsSideMenuShown(open);
  }

  public onClickOutside(open: boolean): void {
    if (this.menuService.isSideMenuShown) {
      this.onToggleMenu(open);
    }
  }
}
