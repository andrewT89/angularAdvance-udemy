import {NgModule} from '@angular/core';

import {ShareModule} from '../shared/share.module';
import {PagesComponent} from './pages.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {PAGES_ROUTES} from './pages.routes';
import {FormsModule} from '@angular/forms';

// temporal
import {IncrementComponent} from '../components/increment/increment.component';

// ng2- charts
import { ChartsModule } from 'ng2-charts';
import {GraficoDonaComponent} from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Pipe module
import {PipesModule} from '../pipes/pipes.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromiseComponent,
    RxjsComponent,
    ProfileComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule
  ]
})
export class PagesModule {}
