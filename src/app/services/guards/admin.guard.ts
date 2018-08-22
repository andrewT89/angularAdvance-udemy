import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public _userService: UsuarioService,
  ) {
  }

  canActivate() {

    if (this._userService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('Bloqueado por el ADMIN GUARD');
      this._userService.logout();
      return false;
    }

  }
}
