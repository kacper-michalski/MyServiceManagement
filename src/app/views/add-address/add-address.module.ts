import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressComponent } from './add-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [AddAddressComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  exports: [AddAddressComponent]
})
export class AddAddressModule { }
