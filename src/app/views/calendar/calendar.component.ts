import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public selectedDay: any;
  public selectButton: boolean;
  constructor() { }
  
  ngOnInit(): void {
    this.selectButton=true;
    this.selectedDay = new Date();
  }

  addMonth() {
    this.selectedDay.setDate(this.selectedDay.getDate() +1);
    console.log(this.selectedDay)
  }
  subtractMonth() {
   
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}

