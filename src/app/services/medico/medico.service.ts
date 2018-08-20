import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {UsuarioService} from '../usuario/usuario.service';
import {Medico} from '../../models/medico.model';

@Injectable()
export class MedicoService {


  constructor(
    public http: HttpClient,
    public _userService: UsuarioService
  ) { }

  loadMedicos(ofSet: number = 0) {
    const url = `${URL_SERVICES}/medico?ofSet=${ofSet}`;

    return this.http.get(url)
      .map( (res: any) => {
        return res;
      });
  }

  loadMedicoByID(id: string) {
    const url = `${URL_SERVICES}/medico/${id}`;
    return this.http.get(url)
      .map((res: any) => res.medico);
  }

  searchMedicos(term: string) {
    // /search/coleccion/medicos/
    const url = `${URL_SERVICES}/search/coleccion/medicos/${term}`;
    return this.http.get(url)
      .map((res: any) => res.medicos);

  }

  deleteMedico(id: string) {
    const url = `${URL_SERVICES}/medico/${id}?token=${this._userService.token}`;
    return this.http.delete(url)
      .map(res => {
        swal('Medico Eliminado', 'Medico eliminado correctamente', 'success');
        return res;
      });
  }

  saveMedico(medico: Medico) {
    let url = `${URL_SERVICES}/medico`;

    if (medico._id) {
      /** update medico **/

      url += `/${medico._id}?token=${this._userService.token}`;

      return this.http.put(url, medico)
        .map((res: any) => {
          swal('Medico Actulizado', medico.nombre, 'success');
          return res.medico;
        });
    } else {
      /** create medico **/
      url += `?token=${this._userService.token}`;

      return this.http.post(url, medico)
        .map((res: any) => {
          swal('Medico Creado', medico.nombre, 'success');
          return res.medico;
        });
    }
  }
}
