import { RxjsComponent } from './rxjs/rxjs.component';
import { PromiseComponent } from './promise/promise.component';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';

// GUARDS
import {AdminGuard} from '../services/service.index';
import {VerifyRenewTokenGuard} from '../services/guards/verify-renew-token.guard';

import {ProfileComponent} from './profile/profile.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {HospitalesComponent} from './hospitales/hospitales.component';
import {MedicosComponent} from './medicos/medicos.component';
import {MedicoComponent} from './medicos/medico.component';
import {SearchComponent} from './search/search.component';

const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerifyRenewTokenGuard],
    data: { tittle: 'Dashboard' }
    },
  {path: 'progress', component: ProgressComponent , data: { tittle: 'Barra de Progreso' }},
  {path: 'graficas1', component: Graficas1Component , data: { tittle: 'Graficas' }},
  {path: 'promise', component: PromiseComponent , data: { tittle: 'Promesas' }},
  {path: 'rxjs', component: RxjsComponent , data: { tittle: 'RxJs' }},
  {path: 'profile', component: ProfileComponent, data: { tittle: 'Perfil' }},
  {path: 'account-settings', component: AccountSettingsComponent , data: { tittle: 'Ajustes' }},
  {path: 'search/:term', component: SearchComponent , data: { tittle: 'Busquedad general' }},
  // Mantenimiento
  {
    path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: {tittle: 'Mantenimiento de Usuarios'}
    },
  {path: 'hospitales', component: HospitalesComponent , data: { tittle: 'Mantenimiento de Hospitales' }},
  {path: 'medicos', component: MedicosComponent , data: { tittle: 'Mantenimiento de Medicos' }},
  {path: 'medico/:id', component: MedicoComponent , data: { tittle: 'Actualizar Medico' }},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
