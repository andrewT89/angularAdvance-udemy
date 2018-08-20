import {Component, OnInit} from '@angular/core';
import {MedicoService} from '../../services/service.index';
import {NgForm} from '@angular/forms';
import {Hospital} from '../../models/hospital.model';
import {HospitalService} from '../../services/service.index';
import {Medico} from '../../models/medico.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico', templateUrl: './medico.component.html', styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
    ) {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (id !== 'nuevo') {
        this.loadMedico(id);
      }
    });

  }

  ngOnInit() {
    this._hospitalService.loadHospital()
      .subscribe(hospitales => this.hospitales = hospitales);

    this._modalUploadService.notification
      .subscribe(res => {
        console.log(res);
        this.medico.img = res.medico.img;
      });
  }

  loadMedico(id: string) {
    this._medicoService.loadMedicoByID(id)
      .subscribe(medico => {
        console.log(medico);
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.changeHospital(this.medico.hospital);
      });
  }

  saveMedico(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this._medicoService.saveMedico(this.medico)
      .subscribe(medico => {
        this.medico._id = medico._id;
        this._router.navigate(['/medico', medico._id]);
      });

  }

  changeHospital(id: string) {
    console.log(id);
    this._hospitalService.getHospital(id)
      .subscribe(hospital => this.hospital = hospital);

  }

  changePhoto() {
    this._modalUploadService.showModal('medicos', this.medico._id);

  }
}
