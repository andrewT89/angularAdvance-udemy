import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './header/header.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NopagefoundComponent} from './nopagefound/nopagefound.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
  ]
})
export class ShareModule {}
