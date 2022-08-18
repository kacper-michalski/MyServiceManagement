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
  public selectedDay = <number>{};
  constructor() { }

  ngOnInit(): void {
    this.numberOfDaysInMonth();
  }

  numberOfDaysInMonth() {
    this.days = dayjs(this.currentDate).daysInMonth();
  }

  addMonth() {
    this.currentDate = dayjs(this.currentDate).add(1, 'month');
    this.numberOfDaysInMonth();
    console.log(this.currentDate.format('YYYY-MM-DD'));
  }
  subtractMonth() {
    this.currentDate = dayjs(this.currentDate).subtract(1, 'month');
    this.numberOfDaysInMonth();
    console.log(this.currentDate.format('YYYY-MM-DD'));
  }
  dayOfWeek(value: number) {
    return dayjs(this.currentDate.format('YYYY-MM')+value.toString()).day();
  }
  private myMapDays = new Map<string, string>([
    ["0", "ndz"],
    ["1", "pon"],
    ["2", "wto"],
    ["3", "śro"],
    ["4", "czw"],
    ["5", "pią"],
    ["6", "sob"]
  ]);
  private myMapMonths = new Map<string, string>([
    ["01", "stycznia"],
    ["02", "lutego"],
    ["03", "marca"],
    ["04", "kwietnia"],
    ["05", "maja"],
    ["06", "czerwca"],
    ["07", "lipca"],
    ["08", "sierpnia"],
    ["09", "września"],
    ["10", "października"],
    ["11", "listopada"],
    ["12", "grudnia"]
  ]);
  getNameDayOfWeek(value: number){
    return this.myMapDays.get(value.toString());
  }
  getNameMonthOfYear(){
    return this.myMapMonths.get(this.currentDate.format('MM')) + " "+ this.currentDate.format('YYYY');
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  chooseDay(value: number){
    return this.selectedDay = value;
  }
  chooseMonth(){
    return this.currentDate.format('MM');
  }
  display: boolean = false;

    showDialog() {
        this.display = true;
    }
}
