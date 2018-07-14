import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.returnObs().subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador ah TERMINADO !!!')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se cerro !!!....');
    this.subscription.unsubscribe();
  }

  returnObs(): Observable <number> {

    return new Observable( (observer: Subscriber<number>) => {

      let contador = 0;
      const interval = setInterval(() => {

      contador ++;

      const salida: any = {
        value: contador
      };

      observer.next(salida);

      // if (contador === 3) {
      //   clearInterval(interval);
      //   observer.complete();
      // }

      // if (contador === 2) {
      //   // clearInterval(interval);
      //   observer.error('Ocurrio un error');
      // }

      }, 1000);

    }).pipe(
      map( res => res),
      filter(  (value, index) => {

        if (((value % 2) === 1)) {
          return true;
        } else {
          return false;
        }

      })
    );
  }

}
