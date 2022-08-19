import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientComponent } from './add-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AddClientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  exports: [AddClientComponent]
})
export class AddClientModule { }
