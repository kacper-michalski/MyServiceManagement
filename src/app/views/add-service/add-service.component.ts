import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { AddServiceService } from 'src/app/services/add-service.service';
import { AddServicemanService } from 'src/app/services/add-serviceman.service';
import { AddAddressService } from 'src/app/services/add-address.service';
import { AddClientService } from 'src/app/services/add-client.service';
import { AddCompanyService } from 'src/app/services/add-company.service';
import { AddDeviceService } from 'src/app/services/add-device.service';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent {
  date: string = '27-07-2022';
  technican: string = 'Kacper Michalski';
  page: number;
  checked: boolean;
  serviceForm = this.fb.group({
    address: this.fb.group({
      checkbox: [''],
      street: [this.addAddressService.address.street, Validators.required],
      zipCode: [this.addAddressService.address.zipCode, Validators.required],
      city: [this.addAddressService.address.city, Validators.required]
    }),
    customer: this.fb.group({
      checkbox: [''],
      firstName: [this.addClientService.client.firstName, Validators.required],
      lastName: [this.addClientService.client.lastName, Validators.required],
      phoneNumber: [this.addClientService.client.phoneNumber, Validators.required],
      email: [this.addClientService.client.email, Validators.required]
    }),
    company: this.fb.group({
      checkbox: [''],
      name: [this.addCompanyService.company.name, Validators.required],
      tin: [this.addCompanyService.company.tin, Validators.required],
      street: [this.addCompanyService.company.street, Validators.required],
      zipCode: [this.addCompanyService.company.zipCode, Validators.required],
      city: [this.addCompanyService.company.city, Validators.required]
    }),
    device: this.fb.group({
      checkbox: [''],
      idFactory: [this.addDeviceService.device.idFactory, Validators.required],
      serialNumber: [this.addDeviceService.device.idFactory, Validators.required],
      idFd: [this.addDeviceService.device.idFactory, Validators.required],
      catalogNumber: [this.addDeviceService.device.catalogNumber, Validators.required]
    }),
    task: this.fb.group({
      description: [this.addServiceService.service.description, Validators.required],
      minPrice: [this.addServiceService.service.minPrice, Validators.required],
      maxPrice: [this.addServiceService.service.maxPrice, Validators.required],
      startTime: ['16:00:00'],
      endTime: ['17:00:00'],
      date: ['2022-07-22', Validators.required],
      idTechnican: ['1', Validators.required]
    })
  });
  constructor(private fb: FormBuilder, private addAddressService: AddAddressService, private addClientService: AddClientService, private addCompanyService: AddCompanyService, private addDeviceService: AddDeviceService, private addServiceService: AddServiceService, private addServicemanService: AddServicemanService, private primengConfig: PrimeNGConfig) { }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.page = 1;
    this.checked = false;

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
