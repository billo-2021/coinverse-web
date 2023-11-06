import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent {
  @Input() public ngClass: string | string[] | Set<string> | { [p: string]: any } | null | undefined;

  public constructor() {}
}
