import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddServicemanComponent } from './add-serviceman.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AddServicemanComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [AddServicemanComponent]
})
export class AddServicemanModule { }
