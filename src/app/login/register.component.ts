import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../services/service.index';
import { User } from '../models/user.model';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  isEquals(field1: string, field2: string) {
    return (group: FormGroup) => {

    const pass1 = group.controls[field1].value;
    const pass2 = group.controls[field2].value;

    if (pass1 === pass2) {
      return null;
    }

      return {
        isEquals: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.form = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl(false),
    }, {validators: this.isEquals('password' , 'password2')});

    this.form.setValue({
      nombre: 'Andres',
      email: 'andres@andres.com',
      password: '123',
      password2: '123',
      conditions: true
    });
  }

  registerUser() {

    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.conditions) {
      swal('IMPORTANTE', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    const usuario = new User (
      this.form.value.nombre,
      this.form.value.email,
      this.form.value.password
    );

    this._usuarioService.createUser(usuario)
            .subscribe(response => this.router.navigate(['/login']));
    }
  }
