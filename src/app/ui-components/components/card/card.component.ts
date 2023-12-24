import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() public title?: string;
  @Input() public subtitle?: string;
  @Input() public actionsContent: TemplateRef<unknown> | null = null;

  @HostBinding('class') private _classes = 'block w-full';
}
