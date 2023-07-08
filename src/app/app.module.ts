import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiModeModule,
  TuiRootModule,
  TuiThemeNightModule
} from "@taiga-ui/core";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CoreModule} from "./core/core.module";
import {UiComponentsModule} from "./ui-components/ui-components.module";
import {AuthenticationModule} from "./features/authentication/authentication.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule.forRoot('localhost:8080/api/v1'),
    UiComponentsModule,
    AuthenticationModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiModeModule,
    TuiThemeNightModule
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
