import { Injectable } from '@angular/core';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable()
export class SidebarService {

  menu: any[] = [];

  // menu: any = [
  //   {
  //     tittle: 'principal',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { tittle: 'Dashboard', url: '/dashboard' },
  //       { tittle: 'ProgressBar', url: '/progress' },
  //       { tittle: 'Graficas', url: '/graficas1' },
  //       { tittle: 'Promesas', url: '/promise' },
  //       { tittle: 'Rxjs', url: '/rxjs' },
  //       { tittle: 'Profile', url: '/profile' },
  //     ]
  //   },
  //   {
  //     tittle: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {tittle: 'Usuarios', url: '/usuarios'},
  //       {tittle: 'Hospitales', url: '/hospitales'},
  //       {tittle: 'Medicos', url: '/medicos'},
  //     ]
  //   }
  // ];

  constructor(
    public _userService: UsuarioService
  ) {}

  loadMenu() {
    this.menu = this._userService.menu;
  }

}
