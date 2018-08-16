import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  constructor( private router: Router,
                private title: Title,
                private meta: Meta ) {

    // Asignar el titulo al breadcrumbs.component
    this.getDataRoute().subscribe( data => {
      this.titulo = data.tittle;
      this.title.setTitle( this.titulo );

    const metaTag: MetaDefinition = {
      name: 'Description',
      content: this.titulo
    };

    this.meta.updateTag( metaTag );

  });

  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(

      // Filtrar la data de los titulo , para imprimir el titulo que le pertenezca
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map((event: ActivationEnd) => event.snapshot.data),
    );
  }

}
