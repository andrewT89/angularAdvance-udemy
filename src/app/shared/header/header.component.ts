import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../services/service.index';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header', templateUrl: './header.component.html', styles: []
})
export class HeaderComponent implements OnInit {

  usuario: User;

  constructor(public _userService: UsuarioService, public router: Router) {
  }

  ngOnInit() {

    this.usuario = this._userService.usuario;

  }

  searchGeneral(term: string) {
    this.router.navigate(['/search', term]);
  }

}
