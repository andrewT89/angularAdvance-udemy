import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(public _userService: UsuarioService,
              public _router: Router) {}

  canActivate() {

    if (this._userService.isLogin()) {
      console.log('PASO EL GUARD');
      return true;
    } else {
      console.log('Bloqueado por el GUARD');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
