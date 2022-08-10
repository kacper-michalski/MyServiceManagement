import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent {
  public currentDate = dayjs();
  public days = <number>{};

  constructor() { }

  ngOnInit(): void {
    this.returnDaysInMonth();
  }

  returnDaysInMonth() {
    this.days = dayjs(this.currentDate).daysInMonth();
  }

  addMonth() {
    this.currentDate = dayjs(this.currentDate).add(1, 'month');
    this.returnDaysInMonth();
    console.log(this.currentDate.format('YYYY-MM-DD'));
  }
  subtractMonth() {
    this.currentDate = dayjs(this.currentDate).subtract(1, 'month');
    this.returnDaysInMonth();
    console.log(this.currentDate.format('YYYY-MM-DD'));
  }
  dayOfWeek(value: number) {
    return dayjs(this.currentDate.format('YYYY-MM')+value.toString()).day();
  }
  private myMap = new Map<string, string>([
    ["0", "ndz"],
    ["1", "pon"],
    ["2", "wto"],
    ["3", "śro"],
    ["4", "czw"],
    ["5", "pią"],
    ["6", "sob"]
  ]);
  getNameDayOfWeek(value: number){
    return this.myMap.get(value.toString());
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
