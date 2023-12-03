import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
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
  @Input() title?: string;
  @Input() subtitle?: string;

  @Input()
  public set classNames(value: string) {
    this._classes = value;
  }

  private _classes = '';

  @HostBinding('class')
  protected get classes(): string {
    return `block full-width ${this._classes}`;
  }
}
