import {
  ChangeDetectionStrategy,
  Component,
  Host,
  HostBinding,
  Inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TuiStepperComponent } from '@taiga-ui/kit';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent {
  @HostBinding('class') classes = 'step';
  @Input() public title = '';
  @Input() public state: 'error' | 'normal' | 'pass' = 'normal';
  @Input() public isDisabled = false;

  public constructor(
    @Inject(TuiStepperComponent)
    @Host()
    private readonly stepper: TuiStepperComponent
  ) {}
}
