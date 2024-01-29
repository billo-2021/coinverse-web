import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

export interface CardComponentInput {
  title?: string;
  subtitle?: string;
  actionsContent: TemplateRef<unknown | null> | null;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements CardComponentInput {
  @Input() public title?: string;
  @Input() public subtitle?: string;
  @Input() public actionsContent: TemplateRef<unknown> | null = null;

  @HostBinding('class') private _classes = 'block w-full';
}
