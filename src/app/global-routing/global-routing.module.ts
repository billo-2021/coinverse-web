import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { GlobalRoutingRoutingModule } from './global-routing-routing.module';
import { GlobalRoutingComponent } from './pages/global-routing/global-routing.component';

@NgModule({
  declarations: [GlobalRoutingComponent],
  exports: [GlobalRoutingComponent],
  imports: [NgCommonModule, GlobalRoutingRoutingModule],
})
export class GlobalRoutingModule {}
