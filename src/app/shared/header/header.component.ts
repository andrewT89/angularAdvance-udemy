import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/service.index';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: User;

  constructor(public _userService: UsuarioService) { }

  ngOnInit() {

    this.usuario = this._userService.usuario;

  }

}
