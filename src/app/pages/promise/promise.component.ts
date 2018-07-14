import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styles: []
})
export class PromiseComponent implements OnInit {

  constructor() {

      this.count().then( mensaje => {
        console.log('Termino', mensaje);
      }).catch( error => {
        console.error('A occurrido un error', error);
      });
   }

  ngOnInit() {
  }

  count(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let contador = 0;

      const interval = setInterval(() => {
        contador += 1;

        if (contador === 3) {
          resolve(true);
          clearInterval(interval);
        }
      }, 5000);
    });
  }

}
