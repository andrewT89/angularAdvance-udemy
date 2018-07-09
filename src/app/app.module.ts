import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// routes app
import {APP_ROUTES} from './app.routes';

// Modulos personalizados
import {PagesModule} from './pages/pages.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { IncrementComponent } from './components/increment/increment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IncrementComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
