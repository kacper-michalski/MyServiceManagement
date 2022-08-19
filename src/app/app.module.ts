import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './views/account/account.component';
import { AddServicemanModule } from './views/add-serviceman/add-serviceman.module';
import { ScheduleModule } from './views/schedule/schedule.module';
import { AddClientModule } from './views/add-client/add-client.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    
  ],
  imports: [
    BrowserModule,
    AddServicemanModule,
    ScheduleModule,
    AddClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
