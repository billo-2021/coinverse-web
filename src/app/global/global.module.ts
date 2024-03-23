import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { UiComponentsModule } from '../ui-components';
import { GlobalRoutingPage } from './pages';
import { GlobalRoutingModule } from './global-routing.module';

@NgModule({
  declarations: [GlobalRoutingPage],
  exports: [GlobalRoutingPage],
  imports: [NgCommonModule, UiComponentsModule, GlobalRoutingModule],
})
export class GlobalModule {}
