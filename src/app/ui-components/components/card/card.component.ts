import {Component, Input} from '@angular/core';
import {Maybe} from "../../../core/types/maybe";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  public class: string = '';
  @Input() title: Maybe<string>;
  @Input() subtitle: Maybe<string>;

  public constructor() {
  }
}
