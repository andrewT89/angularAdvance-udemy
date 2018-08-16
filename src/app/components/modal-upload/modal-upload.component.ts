import { Component, OnInit } from '@angular/core';
import {UploadFileService} from '../../services/uploadFile/upload-file.service';
import {ModalUploadService} from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imageUpload: File;
  imgTemp: string;

  constructor(
    public _uploadFileService: UploadFileService,
    public _ModalUoloadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  hideModal() {
    this.imgTemp = null;
    this.imageUpload = null;

    this._ModalUoloadService.hideModal();
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

  uploadImage() {
    this._uploadFileService.uploadFile(this.imageUpload, this._ModalUoloadService.tipo, this._ModalUoloadService.id)
      .then((res) => {

        console.log(res);
        this._ModalUoloadService.notification.emit(res);
        this.hideModal();

      }).catch(err => {
        console.log('Error en la carga de imagen');
    });
  }

}
