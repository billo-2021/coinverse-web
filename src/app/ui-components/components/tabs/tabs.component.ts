import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

export type Tab = {
  readonly text: string;
  readonly icon: string | null;
  readonly isDisabled: boolean;
};

export interface TabsComponentInput {
  title: string | null;
  tabs: readonly Tab[];
  activeItemIndex: number;
}

export interface TabsComponentOutput {
  activeItemIndexChange: EventEmitter<number>;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements TabsComponentInput, TabsComponentOutput {
  @Input() public title: string | null = null;
  @Input() public tabs: readonly Tab[] = [];
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
