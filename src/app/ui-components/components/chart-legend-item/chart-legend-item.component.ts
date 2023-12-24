import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-chart-legend-item',
  templateUrl: './chart-legend-item.component.html',
  styleUrls: ['./chart-legend-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegendItemComponent {
  @Input() public isActive = false;
  @Input() public color = 'var(--tui-chart-0)';
  @Input() public text = '';

  @Output() public hoveredChange = new EventEmitter<boolean>();

  @HostBinding('class') private _classes = 'block';

  public onHover(hovered: boolean): void {
    this.hoveredChange.emit(hovered);
  }
}
