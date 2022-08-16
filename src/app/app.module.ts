import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './views/account/account.component';
import { ScheduleComponent } from './views/schedule/schedule.component';
import { AddServicemanModule } from './views/add-serviceman/add-serviceman.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ScheduleComponent
    
  ],
  imports: [
    BrowserModule,
    AddServicemanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
