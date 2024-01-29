import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export interface RingChartComponentInput {
  value: readonly number[];
  labels: readonly string[];
  extraLabels: readonly string[];
  total: number;
}

@Component({
  selector: 'app-ring-chart',
  templateUrl: './ring-chart.component.html',
  styleUrls: ['./ring-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RingChartComponent implements RingChartComponentInput {
  @Input() public value: readonly number[] = [];
  @Input() public labels: readonly string[] = [];
  @Input() public extraLabels: readonly string[] = [];
  @Input() public total = 0;
  protected activeItemIndex = 0;
  @HostBinding('class') private _classes = 'ring-chart row-nowrap items-center w-full';

  public getColor(index: number): string {
    return `var(--tui-chart-${index})`;
  }

  public isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  public onHover(index: number, hovered: boolean): void {
    this.activeItemIndex = hovered ? index : 0;
  }
}
