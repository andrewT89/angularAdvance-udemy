import {Component, OnInit} from '@angular/core';
import {Medico} from '../../models/medico.model';
import {MedicoService} from '../../services/service.index';

@Component({
  selector: 'app-medicos', templateUrl: './medicos.component.html', styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  ofSet: number = 0;
  totalRegisters: number = 0;
  constructor(public _medicoService: MedicoService) {
  }

  ngOnInit() {
    this.loadMedicos();
  }

  loadMedicos() {
    this._medicoService.loadMedicos(this.ofSet)
      .subscribe((res: any) => {
        this.totalRegisters = res.total;
        this.medicos = res.medicos;
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
    this.loadMedicos();
  }

  searchByMedico(term: string) {

    if (term.length <= 0) {
      this.loadMedicos();
      return;
    }

    this._medicoService.searchMedicos(term)
      .subscribe(medicos => this.medicos = medicos);
  }

  deleteByMedico(medico: Medico) {
    this._medicoService.deleteMedico(medico._id)
      .subscribe(() => this.loadMedicos());
  }
}
