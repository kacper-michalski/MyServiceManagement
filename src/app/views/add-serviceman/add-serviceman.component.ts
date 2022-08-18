import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddServicemanService } from './add-serviceman.service';
import { FormBuilder } from '@angular/forms';
import { ServicemanDetails } from 'src/app/models/serviceman-details.model';
import {take} from "rxjs";
import { Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-add-serviceman',
  templateUrl: './add-serviceman.component.html',
  styleUrls: ['./add-serviceman.component.scss']
})
export class AddServicemanComponent{
  @Input() display: boolean;
  @Output() toggle = new EventEmitter();
  servicemanForm = this.fb.group({
    name: [this.getServicemanDetails().name, [Validators.required,]],
    phoneNumber: [this.getServicemanDetails().phoneNumber, [Validators.required, Validators.minLength(9)]],
  });


constructor(private fb: FormBuilder, private addServicemanService: AddServicemanService ) {
}

private getServicemanDetails() {
  return this.addServicemanService.servicemanDetails;
}

public onSubmit(){
  const formData= this.createFormData();
  this.addServicemanService.addServiceman(formData).pipe(take(1)).subscribe();
}

private createFormData(){
  const serviceman = this.servicemanForm.value as ServicemanDetails
  const formData = new FormData();
  formData.append('name', serviceman.name);
  formData.append('phoneNumber', serviceman.phoneNumber);
  return formData;
}
// public changeColor(){
//   const field  = document.getElementById('name');
//   if (!this.servicemanForm.get('name')?.valid && field!= null) {
//     field.style.backgroundColor  = "lime"
//   }
//   else if(field != null){
//     field.style.backgroundColor  = "blue"
//   }
// }
  hideDialog(){
    this.display = false;
    this.toggle.emit(this.display);
  }
}