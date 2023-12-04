import {
  TuiAlertModule,
  TuiDialogModule,
  TuiModeModule,
  TuiRootModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { PROVIDERS as CORE_PROVIDERS } from './core/providers';
import { PROVIDERS as COMMON_PROVIDERS } from './common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalRoutingService } from './global-routing';
import { GlobalRoutingModule } from './global-routing/global-routing.module';

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
  providers: [...CORE_PROVIDERS, ...COMMON_PROVIDERS, GlobalRoutingService, JwtHelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}
