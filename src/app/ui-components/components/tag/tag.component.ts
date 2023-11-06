import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

type LeftContentType = '' | 'Error icon';
type SizeType = 's' | 'm' | 'l';
type StatusType = 'default' | 'primary' | 'custom' | 'success' | 'error' | 'warning';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  @Input() public autoColor = false;
  @Input() public isDisabled = false;
  @Input() public editable = false;
  @Input() public hoverable = false;
  @Input() public leftContent: LeftContentType = '';
  @Input() public maxLength: number | null = null;
  @Input() public removable = false;
  @Input() public showLoader = false;
  @Input() public size: SizeType = 'm';
  @Input() public status: StatusType = 'default';
  @Input() public value = '';

  @Output() public edited = new EventEmitter<string>();

  public constructor() {}

  public onEdited(edited: string): void {
    this.edited.emit(edited);
  }
}
