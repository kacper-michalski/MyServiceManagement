import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddServicemanModule } from './views/add-serviceman/add-serviceman.module';
import { ScheduleModule } from './views/schedule/schedule.module';
import { AddClientModule } from './views/add-client/add-client.module';
import { CalendarModule } from './views/calendar/calendar.module';
import { AddAddressModule } from './views/add-address/add-address.module';
import { AddServiceModule } from './views/add-service/add-service.module';
import { AddCompanyModule } from './views/add-company/add-company.module';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AddServicemanModule,
    ScheduleModule,
    AddClientModule,
    CalendarModule,
    AddClientModule,
    AddAddressModule,
    AddServiceModule,
    AddCompanyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
