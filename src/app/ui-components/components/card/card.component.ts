import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'block'}
})
export class CardComponent {
  public class: string | null = null;
  @Input() title?: string;
  @Input() subtitle?: string;

  public constructor() {
  }
}
