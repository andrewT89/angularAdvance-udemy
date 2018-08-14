import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UsuarioService} from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-profile', templateUrl: './profile.component.html', styles: []
})
export class ProfileComponent implements OnInit {

  usuario: User;
  imageUpload: File;
  imgTemp: string;

  constructor(public _userService: UsuarioService) {
    this.usuario = this._userService.usuario;
  }

  ngOnInit() {
  }

  saveUser(usuario: User) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this._userService.updateUser(this.usuario).subscribe(res => {
      console.log(res);
    });
  }

  selectedImage(file: File) {

    if (!file) {
      this.imageUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen..!!', 'error');
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;

    const reader = new FileReader();
    const urlIMageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => this.imgTemp = reader.result;

  }

  changeImage() {
    this._userService.changeImage(this.imageUpload, this.usuario._id);
  }

}
