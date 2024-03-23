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
import { MapperModule } from '@dynamic-mapper/angular';
import { sharedConfig } from './shared';
import { globalConfig, GlobalModule } from './global';
import { UiComponentsModule, uiConfig } from './ui-components';
import { MappingProfile } from './domain';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    GlobalModule,
    MapperModule.withProfiles([MappingProfile]),
  ],
  providers: [...sharedConfig.providers, ...uiConfig.providers, ...globalConfig.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
