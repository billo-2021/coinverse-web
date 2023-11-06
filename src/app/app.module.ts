import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TUI_SANITIZER,
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
import { interceptorProviders } from './core/providers/interceptor-providers/interceptor-providers';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { GlobalRoutingService } from './global-routing/services/global-routing/global-routing.service';
import { apiBaseUrlToken, coreServiceConfig, httpHeadersConfigToken } from './core/config';
import { appTitleToken, commonServiceConfig, menuItemsToken } from './common/config';
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
  providers: [
    GlobalRoutingService,
    ...interceptorProviders,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: apiBaseUrlToken, useValue: coreServiceConfig.apiUrl },
    {
      provide: httpHeadersConfigToken,
      useValue: coreServiceConfig.httpHeadersConfig,
    },
    { provide: appTitleToken, useValue: commonServiceConfig.appTitle },
    { provide: menuItemsToken, useValue: commonServiceConfig.menuItems },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
