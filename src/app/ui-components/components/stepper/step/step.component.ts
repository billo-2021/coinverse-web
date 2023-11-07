import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Host,
  HostBinding,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TuiStepperComponent } from '@taiga-ui/kit';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent implements OnInit, AfterViewInit {
  @HostBinding('class') classes = 'step';
  @Input() public title = '';
  @Input() public state: 'error' | 'normal' | 'pass' = 'normal';
  @Input() public isDisabled = false;

  public constructor(
    @Inject(TuiStepperComponent)
    @Host()
    private readonly stepper: TuiStepperComponent
  ) {
    console.log('Stepper', this.stepper);
  }

  ngOnInit(): void {
    console.log('Stepper', this.stepper);
  }

  ngAfterViewInit(): void {
    console.log('Stepper', this.stepper);
    // console.log('Container ref', this.viewContainerRef.element.nativeElement);
    // if (!this.stepTemplate) {
    //   return;
    // }

    // this.viewContainerRef.detach();
    // this.viewContainerRef.createEmbeddedView(this.stepTemplate);
  }
}
