import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LoadingService } from '../../../core/services/loading/loading.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'form' },
})
export class FormComponent {
  @Input() public isValid = false;
  @Input() public title?: string;
  @Input() public subtitle?: string;
  @Input() public isCancelShown = false;
  @Input() public cancelText = 'Cancel';
  @Input() public saveText = 'Save';
  @Input() public isCancelDisabled = false;
  @Input() public isSaveDisabled = false;

  @Output() public cancelClicked = new EventEmitter<void>();
  @Output() public saveClicked = new EventEmitter<void>();

  protected loading$ = this.loadingService.loading$;

  public constructor(private readonly loadingService: LoadingService) {}

  public onCancelClicked(): void {
    this.cancelClicked.emit();
  }

  public onSaveClicked(): void {
    this.saveClicked.emit();
  }
}
