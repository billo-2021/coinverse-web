import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandComponent {
  @Input() isExpanded = false;
}
