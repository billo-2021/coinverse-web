import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  TuiAlertModule,
  TuiDialogModule,
  TuiModeModule,
  TuiRootModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { PROVIDERS as CORE_PROVIDERS } from './core';
import { PROVIDERS as UI_COMPONENTS_PROVIDERS, UiComponentsModule } from './ui-components';
import { PROVIDERS as COMMON_PROVIDERS } from './common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GlobalRoutingModule, GlobalRoutingService } from './global-routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiComponentsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiModeModule,
    TuiThemeNightModule,
    HttpClientModule,
    GlobalRoutingModule,
  ],
  providers: [
    ...CORE_PROVIDERS,
    ...UI_COMPONENTS_PROVIDERS,
    ...COMMON_PROVIDERS,
    GlobalRoutingService,
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
