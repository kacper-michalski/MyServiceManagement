import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddServicemanComponent } from './add-serviceman.component';



@NgModule({
  declarations: [AddServicemanComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AddServicemanComponent]
})
export class AddServicemanModule { }
