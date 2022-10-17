import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ShareDateService } from 'src/app/services/share-date.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public visibleSidebar: boolean;
  public selectedDay: Date = new Date();
  public selectButton: boolean;
  constructor(private config: PrimeNGConfig, private shareDateService: ShareDateService) {}

  ngOnInit(): void {
    this.config.setTranslation({
      dayNamesMin: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
      monthNamesShort: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
      monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]
    });
    this.selectButton = true;
    this.selectedDay = new Date();
  }
  addDay() {
    this.selectedDay = new Date(this.selectedDay.setDate(this.selectedDay.getDate() + 1));
    this.onSelectedDay();
  }
  subtractDay() {
    this.selectedDay = new Date(this.selectedDay.setDate(this.selectedDay.getDate() - 1));
    this.onSelectedDay();
  }
  currentDate(){
    this.selectedDay = new Date();
    this.onSelectedDay();
  }
  onSelectedDay() {
    this.shareDateService.setDate(this.selectedDay);
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}

