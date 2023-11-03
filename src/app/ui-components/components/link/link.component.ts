import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  @Input() to: string | undefined;
  @Input() text: string | undefined;
  @Input() isDisabled = false;

  public constructor() {
  }
}
