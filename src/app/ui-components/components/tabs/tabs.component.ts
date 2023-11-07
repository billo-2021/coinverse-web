import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Tab } from '../../types';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @Input() public title: string | null = null;
  @Input() public tabs: Tab[] = [
    {text: 'Maps', icon: 'tuiIconCreditCard', isDisabled: false},
    {text: 'Calls', icon: 'tuiIconPhone', isDisabled: false},
    {text: 'Settings', icon: 'tuiIconSettings', isDisabled: false},
  ];

  @Input() public activeItemIndex = 0;

  @Output() public activeItemIndexChange = new EventEmitter<number>();

  public onActiveItemIndexChange(activeItemIndex: number): void {
    if (activeItemIndex === this.activeItemIndex) {
      return;
    }

    this.activeItemIndexChange.emit(activeItemIndex);
  }
}
