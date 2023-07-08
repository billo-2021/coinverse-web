import {NgModule} from '@angular/core';
import {CommonModule as NgCommon} from '@angular/common';
import {TuiCardModule} from "@taiga-ui/addon-commerce";
import {TuiInputPasswordModule, TuiIslandModule} from "@taiga-ui/kit";

import {CommonModule} from '../../common/common.module';
import {FormComponentsModule} from "../../form-components/form-components.module";
import {UiComponentsModule} from "../../ui-components/ui-components.module";

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {LoginComponent} from './pages/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    NgCommon,
    CommonModule,
    FormComponentsModule,
    AuthenticationRoutingModule,
    UiComponentsModule,
    TuiCardModule,
    TuiIslandModule,
    TuiInputPasswordModule
  ]
})
export class AuthenticationModule {
}
