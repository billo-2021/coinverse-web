import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-ring-chart',
  templateUrl: './ring-chart.component.html',
  styleUrls: ['./ring-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RingChartComponent {
  @Input() public value: number[] = [];
  @Input() public labels: string[] = [];
  @Input() public extraLabels: string[] = [];
  @Input() public total = 0;

  protected activeItemIndex = NaN;

  @Input()
  public set classNames(value: string) {
    this._classes = value;
  }

  private _classes = '';

  @HostBinding('class')
  protected get classes(): string {
    return `full-width ${this._classes}`;
  }

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
