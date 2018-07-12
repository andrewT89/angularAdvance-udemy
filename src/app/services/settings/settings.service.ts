import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  adjust: Ajustes = {
    themeUrl: `assets/css/colors/default.css`,
    theme: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.getAjust();
  }

  saveAdjust() {
    localStorage.setItem('adjust', JSON.stringify(this.adjust));
  }

  getAjust() {
    if (localStorage.getItem('adjust')) {
      this.adjust = JSON.parse(localStorage.getItem('adjust'));
      this.applyTheme( this.adjust.theme );
    } else {
      this.applyTheme( this.adjust.theme );
    }
  }

  applyTheme ( theme: string ) {
    const Url = `assets/css/colors/${ theme }.css`;
    this._document.getElementById('theme').setAttribute('href', Url);

    this.adjust.theme = theme;
    this.adjust.themeUrl = Url;

    this.saveAdjust();
  }
}

interface Ajustes {

  themeUrl: string;
  theme: string;
}
