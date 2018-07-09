import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('txtPercentage') txtPercentage: ElementRef;
  @Input('name') leyend: string = 'Leyenda';
  @Input('progress') percentage: number = 50;

  @Output() changeValues: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onChange(newValue: number) {

    // let elemHTML: document.getElementsByName('percentage')[0];
    // console.log(elemHTML);

    if (newValue >= 100) {
      this.percentage = 100;
    } else if (newValue <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = newValue;
    }

    this.txtPercentage.nativeElement.value = this.percentage;

    this.changeValues.emit(this.percentage);
  }

  changeValue(value: number) {

    if (this.percentage >= 100 && value > 0) {
      this.percentage = 100;
      return;
    }

    if (this.percentage <= 0 && value < 0) {
      this.percentage = 0;
      return;
    }

    this.percentage = this.percentage + value;

    this.changeValues.emit(this.percentage);

    this.txtPercentage.nativeElement.focus();
  }

}
