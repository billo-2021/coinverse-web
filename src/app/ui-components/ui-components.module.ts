import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from "@angular/router";
import {TuiInputModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {ButtonComponent} from './components/button/button.component';
import {RowComponent} from './components/row/row.component';
import {ColComponent} from './components/col/col.component';
import {ContainerComponent} from './components/container/container.component';
import {TextComponent} from './components/text/text.component';
import {HeaderComponent} from './components/header/header.component';
import {CardComponent} from './components/card/card.component';
import {HeadingComponent} from './components/heading/heading.component';
import {LoadingIndicatorComponent} from './components/loading-indicator/loading-indicator.component';
import {LogoComponent} from './components/logo/logo.component';
import {LinkComponent} from './components/link/link.component';
import {IconComponent} from './components/icon/icon.component';
import {ItemComponent} from './components/item/item.component';


@NgModule({
  declarations: [
    ButtonComponent,
    ContainerComponent,
    RowComponent,
    ColComponent,
    TextComponent,
    HeaderComponent,
    CardComponent,
    HeadingComponent,
    LoadingIndicatorComponent,
    LogoComponent,
    LinkComponent,
    IconComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    ContainerComponent,
    RowComponent,
    ColComponent,
    TextComponent,
    HeadingComponent,
    CardComponent,
    HeaderComponent,
    LogoComponent,
    IconComponent,
    LinkComponent,
    ItemComponent,
    TuiInputModule,
    TuiTextfieldControllerModule
  ]
})
export class UiComponentsModule {
}
