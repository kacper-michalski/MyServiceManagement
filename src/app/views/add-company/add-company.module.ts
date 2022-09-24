import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCompanyComponent } from './add-company.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AddCompanyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [AddCompanyComponent]
})
export class AddCompanyModule { }
