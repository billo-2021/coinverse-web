import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
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
  @Input() public tabs: Tab[] = [];

  @Input() public activeItemIndex = 0;

  @Output() public activeItemIndexChange = new EventEmitter<number>();

  @HostBinding('class') private _classes = 'block';

  public onActiveItemIndexChange(activeItemIndex: number): void {
    if (activeItemIndex === this.activeItemIndex) {
      return;
    }

    this.activeItemIndexChange.emit(activeItemIndex);
  }
}
