import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientComponent } from './add-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [AddClientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropdownModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule

  ],
  exports: [AddClientComponent]
})
export class AddClientModule { }
