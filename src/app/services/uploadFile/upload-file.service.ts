import {Injectable} from '@angular/core';
import {URL_SERVICES} from '../../config/config';

@Injectable()
export class UploadFileService {

  constructor() {
  }

  uploadFile(file: File, type: string, id: string) {

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen cargada correctamente');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la carga de la Imagen');
            reject(xhr.response);
          }
        }
      };

      const url = `${URL_SERVICES}/upload/${type}/${id}`;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }

}
