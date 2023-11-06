import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ring-chart',
  templateUrl: './ring-chart.component.html',
  styleUrls: ['./ring-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'full-width' },
})
export class RingChartComponent {
  @Input() public value: number[] = [];
  @Input() public labels: string[] = [];
  @Input() public extraLabels: string[] = [];
  @Input() public total = 0;

  protected activeItemIndex = NaN;
  protected readonly NaN = NaN;

  public constructor() {}

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
