import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from './../../config/config';

import swal from 'sweetalert';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {UploadFileService} from '../uploadFile/upload-file.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  usuario: User;
  token: string;
  id: string;
  menu: any[] = [];

  constructor(public _router: Router, public _uploadFile: UploadFileService, public http: HttpClient) {
    this.loadStorage();
  }

  renewToken() {
    const url = `${URL_SERVICES}/login/renewtoken?token=${this.token}`;
    return this.http.get(url)
      .map((res: any) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
      }).catch(err => {
        this._router.navigate(['/login']);
        swal('Error al renovar token', `No se pudo renovar el token`, 'error');
        return Observable.throw(err);
      });;
  }

  isLogin() {
    return (this.token.length > 5 && this.token !== null) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  saveStorage(id: string, token: string, usuario: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this._router.navigate(['/login']);
  }

  loginWithGoogle(token: string) {
    const url = `${URL_SERVICES}/login/google`;
    return this.http.post(url, {token})
      .map((res: any) => {
        this.saveStorage(res.id, res.token, res.usuario, res.menu);
        return true;
      });
  }

  login(usuario: User, remember: boolean = false) {

    // Recordar email con el que se logueo
    if (remember) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';
    return this.http.post(url, usuario)
      .map((res: any) => {
        this.saveStorage(res.id, res.token, res.usuario, res.menu);
        return true;
      }).catch(err => {
        swal('Error en el login', err.error.message, 'error');
        return Observable.throw(err);
      });

  }

  createUser(user: User) {

    const url = URL_SERVICES + '/usuario';

    // return this.http.post(url, user);
    return this.http.post(url, user)
      .map((res: any) => {
        swal('Usuario creado', user.email, 'success');
        return res.usuario;
      }).catch(err => {
        const errMessage = err.error.errors.message.substring(33, 59).toUpperCase();
        swal(err.error.message, `El ${errMessage}`, 'error');
        return Observable.throw(err);
      });
  }

  updateUser(user: User) {
    let url = `${URL_SERVICES}/usuario/${user._id}`;
    url += `?token=${this.token}`;
    return this.http.put(url, user)
      .map((res: any) => {

        if (user._id === this.usuario._id) {
          const userDB: User = res.usuario;
          this.saveStorage(userDB._id, this.token, userDB, this.menu);
        }

        swal('Usuario actualizado correctamente', user.nombre, 'success');
        return true;
      }).catch(err => {
        const errMessage = err.error.errors.message.substring(35, 59).toUpperCase();
        swal(err.error.message, `${errMessage}`, 'error');
        return Observable.throw(err);
      });
  }

  changeImage(file: File, id: string) {
    this._uploadFile.uploadFile(file, 'usuarios', id)
      .then((res: any) => {

        this.usuario.img = res.usuario.img;
        this.saveStorage(id, this.token, this.usuario, this.menu);
        swal(res.message, this.usuario.nombre, 'success');

      }).catch(res => {
      console.log(res);
    });
  }

  loadUsers(ofSet: number = 0) {
    // usuario?ofSet=0
    const url = `${URL_SERVICES}/usuario?ofSet=${ofSet}`;
    return this.http.get(url);
  }

  searchUsers(term: string) {
    // /search/coleccion/medicos/
    const url = `${URL_SERVICES}/search/coleccion/usuarios/${term}`;
    return this.http.get(url)
      .map((res: any) => res.usuarios);

  }

  deleteUserById(id: string) {
    const url = `${URL_SERVICES}/usuario/${id}?token=${this.token}`;
    return this.http.delete(url)
      .map(res => {
        return true;
      });
  }
}
