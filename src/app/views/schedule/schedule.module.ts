import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ScheduleComponent } from './schedule.component';
import { AddServicemanModule } from '../add-serviceman/add-serviceman.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    DialogModule,
    AddServicemanModule,
    BrowserAnimationsModule
  ],
  exports: [ScheduleComponent]
})
export class ScheduleModule { }
