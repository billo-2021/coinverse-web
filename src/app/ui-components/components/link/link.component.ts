import { Component, HostBinding, Input } from '@angular/core';

export interface LinkComponentInput {
  to: string | undefined;
  text: string | undefined;
  disabled: boolean;
}

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements LinkComponentInput {
  @Input() public to: string | undefined;
  @Input() public text: string | undefined;
  @Input() public disabled = false;

  @HostBinding('class') private _classes = 'inline-block';
}
