import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from './../../config/config';

import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {UploadFileService} from '../uploadFile/upload-file.service';

@Injectable()
export class UsuarioService {

  usuario: User;
  token: string;
  id: string;

  constructor(public _router: Router, public _uploadFile: UploadFileService, public http: HttpClient) {
    this.loadStorage();
  }

  isLogin() {
    return (this.token.length > 5 && this.token !== null) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  saveStorage(id: string, token: string, usuario: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this._router.navigate(['/login']);
  }

  loginWithGoogle(token: string) {
    const url = `${URL_SERVICES}/login/google`;
    return this.http.post(url, {token})
      .map((res: any) => {
        this.saveStorage(res.id, res.token, res.usuario);
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
        this.saveStorage(res.id, res.token, res.usuario);
        return true;
      });

  }

  createUser(user: User) {

    const url = URL_SERVICES + '/usuario';

    // return this.http.post(url, user);
    return this.http.post(url, user)
      .map((res: any) => {
        swal('Usuario creado', user.email, 'success');
        return res.usuario;
      });
  }

  updateUser(user: User) {
    let url = `${URL_SERVICES}/usuario/${user._id}`;
    url += `?token=${this.token}`;
    return this.http.put(url, user)
      .map((res: any) => {
        this.saveStorage(res.id, res.token, res.usuario);
        swal('Usuario actualizado correctamente', user.nombre, 'success');
        return res.usuario;
      });
  }

  changeImage(file: File, id: string) {
    this._uploadFile.uploadFile(file, 'usuarios', id)
      .then((res: any) => {

        this.usuario.img = res.usuario.img;
        this.saveStorage(id, this.token, this.usuario);
        swal(res.message, this.usuario.nombre, 'success');

      }).catch(res => {
      console.log(res);
    });
  }

}
