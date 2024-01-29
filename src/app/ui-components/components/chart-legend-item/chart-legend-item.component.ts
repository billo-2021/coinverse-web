import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

export interface ChartLegendItemComponentInput {
  active: boolean;
  color: string;
  text: string;
}

export interface ChartLegendItemComponentOutput {
  hoverChange: EventEmitter<boolean>;
}

@Component({
  selector: 'app-chart-legend-item',
  templateUrl: './chart-legend-item.component.html',
  styleUrls: ['./chart-legend-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegendItemComponent
  implements ChartLegendItemComponentInput, ChartLegendItemComponentOutput
{
  @Input() public active = false;
  @Input() public color = 'var(--tui-chart-0)';
  @Input() public text = '';

  @Output() public hoverChange = new EventEmitter<boolean>();

  @HostBinding('class') private _classes = 'block';

  public onHover(hovered: boolean): void {
    this.hoverChange.emit(hovered);
  }
}
