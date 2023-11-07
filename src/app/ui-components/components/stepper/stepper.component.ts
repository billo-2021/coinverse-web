import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TuiBreakpointService } from '@taiga-ui/core';
import { TuiStepperComponent } from '@taiga-ui/kit';

type StepType = {
  title: string;
  state: 'error' | 'normal' | 'pass';
  isDisabled: boolean;
};

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent {
  @HostBinding('class') classes = 'stepper';
  @Input() currentStepIndex = 0;
  @Input() steps: StepType[] = [];

  @Output() currentStepIndexChange = new EventEmitter<number>();

  @ViewChild('tuiStepper') private tuiStepper?: TuiStepperComponent;

  public constructor(
    @Inject(TuiBreakpointService)
    protected readonly breakpoint$: TuiBreakpointService
  ) {
  }

  public onCurrentStepChanged(currentStep: number) {
    this.currentStepIndexChange.emit(currentStep);
  }

  public activate(index: number): void {
    if (!this.tuiStepper) {
      return;
    }

    this.tuiStepper.activate(index);
  }

  public isActive(index: number): boolean {
    if (!this.tuiStepper) {
      return false;
    }

    return this.tuiStepper.isActive(index);
  }
}
