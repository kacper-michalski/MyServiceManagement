import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { AddClientService } from 'src/app/services/add-client.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AddAddressService } from 'src/app/services/add-address.service';
import { take } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { Device } from 'src/app/models/device.model';
import { PrimeNGConfig } from 'primeng/api';
import { AddDeviceService } from 'src/app/services/add-device.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  providers: [AddClientService]
})


export class AddAddressComponent {
  defaultDevice = {
    name: [""],
  };
  defaultAddress = {
    devices: this.fb.array([this.fb.group(this.defaultDevice)]),
    streetNumber: [""],
    town: [""],
    zip: [""]
  };
  page: number;
  
  addressForm = this.fb.group({
    street: [this.getAddress().street, [Validators.required]],
    zipCode: [this.getAddress().zipCode, [Validators.required]],
    city: [this.getAddress().city, [Validators.required]],
    idFactory: [this.getDevice().idFactory, [Validators.required]],
    idFd: [this.getDevice().idFd, [Validators.required]],
    serialNumber: [this.getDevice().serialNumber, [Validators.required]],
    catalogNumber: [this.getDevice().catalogNumber, [Validators.required]]
  });
  constructor(private addClientService: AddClientService, private fb: FormBuilder, private addAddressService: AddAddressService, private primengConfig: PrimeNGConfig, private addDeviceService: AddDeviceService) {
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.page = 1;
  }
  private getAddress() {
    return this.addAddressService.address;
  }
  public getDevice() {
    return this.addDeviceService.device;
  }
  public get addresses() {
    // return (this.addressForm.get('addresses')! as FormArray<FormGroup>).controls;
    return
  }
  public onSubmit() {
    const address = this.addressForm.value as Address;
    const device = this.addressForm.value as Device;
    this.addAddressService.addAddress(address).pipe(take(1)).subscribe();
    this.addDeviceService.addDevice(device).pipe(take(1)).subscribe();
    this.addressForm.reset();
  }
  public addField(path: string, group: any) {
    const fb = this.addressForm.get(path);
    (fb as FormArray).push(this.fb.group(group));
  }
  public onClickNextPage() {
    this.page += 1;
  }
}

