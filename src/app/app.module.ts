import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './views/account/account.component';
import { AddServicemanModule } from './views/add-serviceman/add-serviceman.module';
import { ScheduleModule } from './views/schedule/schedule.module';
import { AddClientComponent } from './views/add-client/add-client.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AddClientComponent
    
  ],
  imports: [
    BrowserModule,
    AddServicemanModule,
    ScheduleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
