import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {User} from '../../models/user.model';
import {Medico} from '../../models/medico.model';
import {Hospital} from '../../models/hospital.model';

@Component({
  selector: 'app-search', templateUrl: './search.component.html', styles: []
})
export class SearchComponent implements OnInit {

  usuarios: User [] = [];
  medicos: Medico [] = [];
  hospitales: Hospital [] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
    activatedRoute.params
      .subscribe(params => {
        const term = params['term'];
        this.search(term);
      });
  }

  ngOnInit() {
  }

  search(term: string) {

    const url = `${URL_SERVICES}/search/all/${term}`; // search/all/
    this.http.get(url)
      .subscribe((res: any) => {
        console.log(res);
        this.usuarios = res.usuarios;
        this.medicos = res.medicos;
        this.hospitales = res.hospitales;
      });
  }

}
