import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { AddServiceService } from 'src/app/services/add-service.service';
import { AddServicemanService } from 'src/app/services/add-serviceman.service';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent {

  page: number;
  checked: boolean;
  serviceForm = this.fb.group({
    checkbox: [''],
    // client: [this.addClientService.clientDetails.firstName, Validators.required],
    // address: [this.addAddressService.address.street, Validators.required],
    // device: [this.fb.array([this.fb.group(this.defaultDevice)])],
    // description: [this.getService().description, [Validators.required]],
    // date: [this.getService().date, [Validators.required]],
    // commencement: [this.getService().commencement, [Validators.required]],
    // termination: [this.getService().termination, [Validators.required]],
    // status: [this.getService().status, [Validators.required]],
    // serviceman: [this.getServiceman().name, [Validators.required]],
    // price: [this.getService().price, [Validators.required]]

  });
  constructor(private fb: FormBuilder, private addServiceService: AddServiceService, private addServicemanService: AddServicemanService, private primengConfig: PrimeNGConfig) { }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.page = 1;
    this.checked = false;

  }
  private getService() {
    return this.addServiceService.service;
  }
  private getServiceman() {
    return this.addServicemanService.servicemanDetails;
  }
  public getDevices(address: any) {
    return (address.get('devices')! as FormArray).controls;
  }
  public onSubmit() {
    const service = this.serviceForm.value as Service;
    this.addServiceService.addService(service).pipe(take(1)).subscribe();
    this.serviceForm.reset();
  }

  public onClickNextPage() {
    this.page += 1;
  }
}
