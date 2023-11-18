import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  TuiButtonModule,
  TuiGroupModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiNotificationModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiReorderModule, TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiAppBarModule, TuiSidebarModule } from '@taiga-ui/addon-mobile';
import {
  TuiAxesModule,
  TuiLegendItemModule,
  TuiLineChartModule,
  TuiRingChartModule,
} from '@taiga-ui/addon-charts';
import {
  TuiAvatarModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiStepperModule,
  TuiTabsModule,
  TuiTagModule,
} from '@taiga-ui/kit';
import { TuiBlockStatusModule } from '@taiga-ui/layout';

import { ButtonComponent } from './components/button/button.component';
import { RowComponent } from './components/row/row.component';
import { ColComponent } from './components/col/col.component';
import { ContainerComponent } from './components/container/container.component';
import { TextComponent } from './components/text/text.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { HeadingComponent } from './components/heading/heading.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { LogoComponent } from './components/logo/logo.component';
import { LinkComponent } from './components/link/link.component';
import { IconComponent } from './components/icon/icon.component';
import { ItemComponent } from './components/item/item.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { StepComponent } from './components/stepper/step/step.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuHeaderComponent } from './components/menu/menu-header/menu-header.component';
import { SideMenuComponent } from './components/menu/side-menu/side-menu.component';
import { MenuFooterComponent } from './components/menu/menu-footer/menu-footer.component';
import { TuiActiveZoneModule, TuiAutoFocusModule, TuiHoveredModule, TuiLetModule } from '@taiga-ui/cdk';
import { MoneyComponent } from './components/money/money.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { RingChartComponent } from './components/ring-chart/ring-chart.component';
import { ChartLegendItemComponent } from './components/chart-legend-item/chart-legend-item.component';
import { TableComponent } from './components/table/table.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from './components/tabs/tabs.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { TagComponent } from './components/tag/tag.component';
import { GroupComponent } from './components/group/group.component';
import { RowItemComponent } from './components/row-item/row-item.component';
import { BlockStatusComponent } from './components/block-status/block-status.component';

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
    ItemComponent,
    StepperComponent,
    StepComponent,
    NotificationComponent,
    MenuComponent,
    MenuHeaderComponent,
    SideMenuComponent,
    MenuFooterComponent,
    MoneyComponent,
    LineChartComponent,
    RingChartComponent,
    ChartLegendItemComponent,
    TableComponent,
    TablePaginationComponent,
    TabsComponent,
    AvatarComponent,
    TagComponent,
    GroupComponent,
    RowItemComponent,
    BlockStatusComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TuiSvgModule,
    TuiIslandModule,
    TuiButtonModule,
    TuiLinkModule,
    TuiModeModule,
    TuiLoaderModule,
    TuiStepperModule,
    TuiScrollbarModule,
    TuiNotificationModule,
    TuiAppBarModule,
    TuiLabelModule,
    TuiAvatarModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiAutoFocusModule,
    TuiMarkerIconModule,
    TuiHintModule,
    TuiLineChartModule,
    TuiAxesModule,
    TuiRingChartModule,
    TuiLegendItemModule,
    TuiMoneyModule,
    TuiHoveredModule,
    TuiTableModule,
    TuiTablePaginationModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiInputCountModule,
    TuiHostedDropdownModule,
    TuiReorderModule,
    FormsModule,
    ReactiveFormsModule,
    TuiLetModule,
    TuiTabsModule,
    TuiTagModule,
    TuiGroupModule,
    TuiBlockStatusModule,
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
    LoadingIndicatorComponent,
    StepperComponent,
    StepComponent,
    NotificationComponent,
    MenuComponent,
    MenuHeaderComponent,
    SideMenuComponent,
    MenuFooterComponent,
    MoneyComponent,
    LineChartComponent,
    RingChartComponent,
    TableComponent,
    TabsComponent,
    AvatarComponent,
    TagComponent,
    GroupComponent,
    RowItemComponent,
    BlockStatusComponent,
  ],
})
export class UiComponentsModule {
}
