import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddServicemanService } from '../../services/add-serviceman.service';
import { FormBuilder } from '@angular/forms';
import { ServicemanDetails } from 'src/app/models/serviceman-details.model';
import { take } from "rxjs";
import { Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-add-serviceman',
  templateUrl: './add-serviceman.component.html',
  styleUrls: ['./add-serviceman.component.scss']
})
export class AddServicemanComponent {
  @Input() display: boolean;
  @Output() toggle = new EventEmitter();
  servicemanForm = this.fb.group({
    name: [this.getServicemanDetails().name, [Validators.required]],
    phoneNumber: [this.getServicemanDetails().phoneNumber, [Validators.required]],
    email: [this.getServicemanDetails().email, [Validators.required]]
  });


  constructor(private fb: FormBuilder, private addServicemanService: AddServicemanService) {
  }

  private getServicemanDetails() {
    return this.addServicemanService.servicemanDetails;
  }

  public onSubmit() {
    const serviceman = this.servicemanForm.value as ServicemanDetails
    this.addServicemanService.addServiceman(serviceman).pipe(take(1)).subscribe();
    this.servicemanForm.reset();
  }


  hideDialog() {
    this.display = false;
    this.toggle.emit(this.display);
  }
}