import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  percentage1: number = 20;
  percentage2: number = 50;

  constructor() {
  }

  ngOnInit() {
  }

  updateProgress(event: number) {
    console.log('Event', event);
    this.percentage1 = event;
  }

}
