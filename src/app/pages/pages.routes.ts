import { RxjsComponent } from './rxjs/rxjs.component';
import { PromiseComponent } from './promise/promise.component';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {PagesComponent} from './pages.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {LoginGuardGuard} from '../services/service.index';
import {ProfileComponent} from './profile/profile.component';
import {UsuariosComponent} from './usuarios/usuarios.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent, data: { tittle: 'Dashboard' } },
      {path: 'progress', component: ProgressComponent , data: { tittle: 'Barra de Progreso' }},
      {path: 'graficas1', component: Graficas1Component , data: { tittle: 'Graficas' }},
      {path: 'promise', component: PromiseComponent , data: { tittle: 'Promesas' }},
      {path: 'rxjs', component: RxjsComponent , data: { tittle: 'RxJs' }},
      {path: 'profile', component: ProfileComponent, data: { tittle: 'Perfil' }},
      {path: 'account-settings', component: AccountSettingsComponent , data: { tittle: 'Ajustes' }},
      // Mantenimiento
      {path: 'usuarios', component: UsuariosComponent , data: { tittle: 'Mantenimiento de Usuarios' }},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
