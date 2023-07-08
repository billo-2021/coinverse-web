import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {
  @Input() public ngClass: string = '';
  @Input() public level: 1 | 2 | 3 | 4 = 1;
  @Input() public text: string = '';
}
