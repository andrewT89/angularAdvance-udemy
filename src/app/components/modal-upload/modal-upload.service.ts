import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';
  public notification = new EventEmitter<any>();

  constructor() {
    console.log('modal upload listo..');
  }

  hideModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  showModal(tipo: string, id: string) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
  }

}
