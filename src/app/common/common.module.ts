import { NgModule } from '@angular/core';
import { CommonModule as ngCommonModule } from '@angular/common';
import { PolymorphicOutletDirective } from './directives/polymorphic/outlet.directive';
import { PolymorphicTemplate } from './directives/template.directive';

@NgModule({
  declarations: [PolymorphicOutletDirective, PolymorphicTemplate],
  imports: [ngCommonModule],
  providers: [],
  exports: [PolymorphicOutletDirective, PolymorphicTemplate],
})
export class CommonModule {}
