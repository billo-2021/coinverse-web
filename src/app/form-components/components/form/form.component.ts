import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  @HostBinding('class') public classes = 'form';
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

  public constructor(private readonly _loadingService: LoadingService) {
  }

  protected get loading$(): Observable<boolean> {
    return this._loadingService.loading$;
  }

  public onCancelClicked(): void {
    this.cancelClicked.emit();
  }

  public onSaveClicked(): void {
    this.saveClicked.emit();
  }
}
