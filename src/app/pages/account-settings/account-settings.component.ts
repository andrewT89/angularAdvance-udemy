import {Component, OnInit} from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _adjusts: SettingsService) {
  }

  ngOnInit() {

    this.selectedCheck();

  }

  changeTheme(theme: string, link: any) {

    this.applyCheck(link);

    this._adjusts.applyTheme(theme);
  }

  applyCheck(link: any) {

    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');

  }

  selectedCheck() {
    const selectors: any = document.getElementsByClassName('selector'),
      theme = this._adjusts.adjust.theme;
    for (const ref of selectors) {

      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
      }

    }
  }

}
