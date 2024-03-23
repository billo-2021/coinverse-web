import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskEmailPipe } from './pipes';
import { AutoFocusDirective } from './directives';

@NgModule({
  declarations: [MaskEmailPipe, AutoFocusDirective],
  imports: [CommonModule],
  providers: [],
  exports: [MaskEmailPipe, AutoFocusDirective],
})
export class SharedModule {}
