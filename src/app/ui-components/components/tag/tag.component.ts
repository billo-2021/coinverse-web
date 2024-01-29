import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { SizeL, SizeS } from '../../../common';
import { Status } from '../../types';

export type LeftContentType = '' | 'Error icon';
export type TagSize = SizeL | SizeS;

export interface TagComponentInput {
  autoColor: boolean;
  disabled: boolean;
  editable: boolean;
  hoverable: boolean;
  leftContent: LeftContentType;
  maxLength: number | null;
  removable: boolean;
  showLoader: boolean;
  size: TagSize;
  status: Status;
  value: string;
}

export interface TagComponentOutput {
  edited: EventEmitter<string>;
}

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent implements TagComponentInput, TagComponentOutput {
  @Input() public autoColor = false;
  @Input() public disabled = false;
  @Input() public editable = false;
  @Input() public hoverable = false;
  @Input() public leftContent: LeftContentType = '';
  @Input() public maxLength: number | null = null;
  @Input() public removable = false;
  @Input() public showLoader = false;
  @Input() public size: TagSize = 'm';
  @Input() public status: Status = 'default';
  @Input() public value = '';

  @Output() public edited = new EventEmitter<string>();

  @HostBinding('class') private _classes = 'block';

  public onEdited(edited: string): void {
    this.edited.emit(edited);
  }
}
