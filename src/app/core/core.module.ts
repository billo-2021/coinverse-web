import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";

import {baseUrlToken} from "./config/service.config";
import {HttpCrudService} from "./services";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule {
  public static forRoot(baseUrl: string): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: baseUrlToken, useValue: baseUrl},
        HttpCrudService
      ]
    }
  }
}
