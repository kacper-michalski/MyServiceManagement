import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleModule } from '../schedule/schedule.module';
import { CalendarModule as CalendarModulePrimeNg } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ScheduleModule,
    CalendarModulePrimeNg,
    FormsModule,
    SidebarModule,
    CheckboxModule
  ],
  exports: [CalendarComponent]
})
export class CalendarModule { }
