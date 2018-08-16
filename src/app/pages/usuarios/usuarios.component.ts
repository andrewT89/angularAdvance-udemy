import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UsuarioService} from '../../services/service.index';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios', templateUrl: './usuarios.component.html', styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: User[] = [];
  ofSet: number = 0;
  totalRegisters: number = 0;
  loading: boolean = true;

  constructor(public _userService: UsuarioService, public _ModalUoloadService: ModalUploadService) {
  }

  ngOnInit() {
    this.loadUsers();
    this._ModalUoloadService.notification
      .subscribe(res => this.loadUsers());
  }

  loadUsers() {

    this.loading = true;
    this._userService.loadUsers(this.ofSet)
      .subscribe((res: any) => {
        this.totalRegisters = res.total;
        this.usuarios = res.usuarios;
        this.loading = false;
      });
  }

  changeOfSet(val: number) {
    const ofSet = this.ofSet + val;

    if (ofSet >= this.totalRegisters) {
      return;
    }
    if (ofSet < 0) {
      return;
    }

    this.ofSet += val;
    this.loadUsers();
  }

  searcByhUser(term: string) {

    if (term.length <= 0) {
      this.loadUsers();
      return;
    }

    this.loading = true;

    this._userService.searchUsers(term)
      .subscribe((usuarios: User[]) => {
        this.usuarios = usuarios;
        this.loading = false;
      });
  }

  deleteByUser(usuario: User) {
    if (usuario._id === this._userService.usuario._id) {
      swal('No puede borrar el usuario', `No puede borrarse a si mismo`, 'error');
      return;
    }

    swal({
      title: `¿Estas seguro?`, text: `Estas a punto de borrar a: ${usuario.nombre}`, icon: `warning`, buttons: true, dangerMode: true,
    })
      .then(Delete => {
        if (Delete) {
          this._userService.deleteUserById(usuario._id)
            .subscribe(del => {
              console.log(del);
              swal(`Usuario eliminado`, `El usuario se elimino correctamente`, `success`);
              this.loadUsers();
            });
        }
      });
  }

  saveByUser(usuario: User) {
    this._userService.updateUser(usuario)
      .subscribe();
  }

  showModal(id: string) {
    this._ModalUoloadService.showModal('usuarios', id);
  }
}
