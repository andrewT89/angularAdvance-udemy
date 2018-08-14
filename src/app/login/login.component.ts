import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UsuarioService} from '../services/service.index';
import {User} from '../models/user.model';

declare function init_plugins();

declare const gapi: any;

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  remember: boolean = false;
  auth2: any;

  constructor(public _router: Router,
              public _userService: UsuarioService) {
  }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.remember = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1062649039287-buhi3kveijrbnb1qu474b7uf23ml0hkn.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));

    });
  }

  attachSignIn(elemnt) {
    this.auth2.attachClickHandler(elemnt, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this._userService.loginWithGoogle(token)
        .subscribe(res => window.location.href = '#/dashboard');
    });
  }

  singIn(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const usuario = new User(form.value.nombre, form.value.email, form.value.password);
    this._userService.login(usuario, form.value.remember)
      .subscribe(res => this._router.navigate(['/dashboard']));
  }
}
