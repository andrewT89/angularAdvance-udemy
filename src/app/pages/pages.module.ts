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

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementComponent,
    GraficoDonaComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
  ],
  imports: [
    ShareModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule {}
