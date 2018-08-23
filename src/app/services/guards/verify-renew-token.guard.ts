import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable()
export class VerifyRenewTokenGuard implements CanActivate {

  constructor(public _userService: UsuarioService, public router: Router) {
  }

  canActivate(): Promise<boolean> | boolean {

    console.log('verifica token guard');

    const token = this._userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expired = this.expiredToken(payload.exp);

    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }
    console.log(payload);

    return this.verifyRenew(payload.exp);
  }

  verifyRenew(dateExpired: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const tokenExpired = new Date(dateExpired * 1000);
      const now = new Date();

      now.setTime(now.getTime() + (4 * 60 * 60 * 1000));

      // console.log(tokenExpired);
      // console.log(now);

      if (tokenExpired.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this._userService.renewToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }


    });
  }

  expiredToken(dateExpired: number) {
    const now = new Date().getTime() / 1000;

    if (dateExpired < now) {
      return true;
    } else {
      return false;
    }
  }
}
