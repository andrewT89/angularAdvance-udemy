import {Pipe, PipeTransform} from '@angular/core';
import {URL_SERVICES} from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'usuarios'): any {

    let URL = `${URL_SERVICES}/images`;

    if (!img) {
      return URL + '/usuario/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (type) {
      case 'usuarios':
        URL += '/usuarios/' + img;
        break;

      case 'medico':
        URL += '/medicos/' + img;
        break;

      case 'hospital':
        URL += '/hospitales/' + img;
        break;

      default:
        console.log('tipo de imagen no existe, usuario, medico, hospital');
        URL += '/usuario/xxx';
    }

    return URL;
  }

}
