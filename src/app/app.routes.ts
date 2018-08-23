import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register.component';
import {NopagefoundComponent} from './shared/nopagefound/nopagefound.component';
import {PagesComponent} from './pages/pages.component';
import {LoginGuardGuard} from './services/guards/login-guard.guard';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  // Carga lenta (Lazy load)
  {
    path: '',
    component: PagesComponent,
    loadChildren: './pages/pages.module#PagesModule',
    canActivate: [LoginGuardGuard]
  },
  {path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
