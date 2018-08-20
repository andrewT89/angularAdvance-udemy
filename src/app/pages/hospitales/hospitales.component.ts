import {Component, OnInit} from '@angular/core';
import {Hospital} from '../../models/hospital.model';
import {HospitalService} from '../../services/service.index';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales', templateUrl: './hospitales.component.html', styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  loading: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) {
  }

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notification
      .subscribe(res => this.loadHospitals());
  }

  modalCreateHospital() {
    swal({
      title: 'Crear Nuevo Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((value: string) => {
      if (!value || value.length === 0) {
        return;
      }

      this._hospitalService.createHospital(value)
        .subscribe(() => this.loadHospitals());
    });
  }

  loadHospitals() {

    this.loading = true;
    this._hospitalService.loadHospital()
      .subscribe(hospitales => {
        this.hospitales = hospitales;
        this.loading = false;
      });
  }

  searcByHospital(term: string) {
    if (term.length <= 0) {
      this.loadHospitals();
      return;
    }

    this.loading = true;
    this._hospitalService.searchHospitals(term)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.loading = false;
      });
  }

  saveByHospital(hospital: Hospital) {
    this._hospitalService.updateHospital(hospital)
      .subscribe();
  }

  deleteByHospital(hospital: Hospital) {

    this._hospitalService.deleteHospital(hospital._id)
      .subscribe(() => this.loadHospitals());
  }

  updateImage(id: string) {
    this._modalUploadService.showModal('hospitales', id);
  }

}
