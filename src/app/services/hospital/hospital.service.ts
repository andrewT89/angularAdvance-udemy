import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {UsuarioService} from '../usuario/usuario.service';
import {Hospital} from '../../models/hospital.model';

@Injectable()
export class HospitalService {

  totalHospitales: number = 0;

  constructor(public http: HttpClient, public _userService: UsuarioService) {
  }

  loadHospital() {

    const url = `${URL_SERVICES}/hospital`;
    return this.http.get(url)
      .map((res: any) => {
        this.totalHospitales = res.total;
        return res.hospitales;
      });
  }

  getHospital(id: string) {

    const url = `${URL_SERVICES}/hospital/${id}`;
    return this.http.get(url)
      .map((res: any) => res.hospital);
  }

  createHospital(nombre: string) {

    const url = `${URL_SERVICES}/hospital?token=${this._userService.token}`;
    return this.http.post(url, {nombre})
      .map((res: any) => res.hospital);
  }

  deleteHospital(id: string) {

    const url = `${URL_SERVICES}/hospital/${id}?token=${this._userService.token}`;
    return this.http.delete(url)
      .map((res: any) => swal('Hospital eliminado', 'Se elimino el registro correctamente', 'success'));
  }

  searchHospitals(term: string) {

    const url = `${URL_SERVICES}/search/coleccion/hospitales/${term}`;
    return this.http.get(url)
      .map((res: any) => res.hospitales);

  }

  updateHospital(hospital: Hospital) {
    const url = `${URL_SERVICES}/hospital/${hospital._id}?token=${this._userService.token}`;
    return this.http.put(url, hospital)
      .map((res: any) => {
        swal('Hospital Actualizado correctamente', `HOSPITAL: ${hospital.nombre}`, 'success');
        return res.hospital;
      });
  }
}
