import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      tittle: 'principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { tittle: 'Dashboard', url: '/dashboard' },
        { tittle: 'ProgressBar', url: '/progress' },
        { tittle: 'Graficas', url: '/graficas1' },
        { tittle: 'Promesas', url: '/promise' },
        { tittle: 'Rxjs', url: '/rxjs' },
        { tittle: 'Profile', url: '/profile' },
      ]
    }
  ];

  constructor() {
  }

}
