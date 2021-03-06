import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// routes app
import {APP_ROUTES} from './app.routes';

// Modulos personalizados
import {PagesComponent} from './pages/pages.component';
import {ShareModule} from './shared/share.module';

// temporal
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// servicios
import { ServiceModule } from './services/service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    ShareModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
