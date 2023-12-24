import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TuiPoint } from '@taiga-ui/core';
import { TUI_DEFAULT_STRINGIFY, TuiContextWithImplicit } from '@taiga-ui/cdk';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
  @Input() public data: TuiPoint[] = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
  ];
  protected readonly stringify = TUI_DEFAULT_STRINGIFY;

  @HostBinding('class') private _classes = 'block w-full';

  protected readonly hintContent = ({
    $implicit,
  }: TuiContextWithImplicit<readonly TuiPoint[]>): number => $implicit[0][1];
}
