import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './views/account/account.component';
import { ScheduleComponent } from './views/schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
