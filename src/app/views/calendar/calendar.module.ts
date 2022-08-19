import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { CalendarComponent } from './calendar.component';
import { AddServicemanModule } from '../add-serviceman/add-serviceman.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleModule } from '../schedule/schedule.module';


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    DialogModule,
    AddServicemanModule,
    BrowserAnimationsModule,
    ScheduleModule
  ],
  exports: [CalendarComponent]
})
export class CalendarModule { }
