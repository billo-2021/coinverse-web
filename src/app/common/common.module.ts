import { NgModule } from '@angular/core';
import { CommonModule as ngCommonModule } from '@angular/common';
import { MaskEmailPipe } from './pipes';

@NgModule({
  declarations: [MaskEmailPipe],
  imports: [ngCommonModule],
  providers: [],
  exports: [MaskEmailPipe],
})
export class CommonModule {}
