import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientComponent } from './add-client.component';

@NgModule({
  declarations: [AddClientComponent],
  imports: [
    CommonModule,
    
  ],
  exports: [AddClientComponent]
})
export class AddClientModule { }
