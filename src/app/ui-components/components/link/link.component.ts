import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input() public to: string | undefined;
  @Input() public text: string | undefined;
  @Input() public isDisabled = false;
}
