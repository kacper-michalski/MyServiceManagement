import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public selectedDay: any;
  public selectButton: boolean;
  public calendar_pl: any;
  constructor(private config: PrimeNGConfig) { }

  ngOnInit(): void {
    this.config.setTranslation({
      dayNamesMin: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
      monthNamesShort: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
      monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]
    });
    this.selectButton = true;
    this.selectedDay = new Date();
  }
  addMonth() {
    this.selectedDay.setDate(this.selectedDay.getDate() + 1);
    console.log(this.selectedDay)
  }
  subtractMonth() {

  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}

