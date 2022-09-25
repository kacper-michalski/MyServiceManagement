import { Component, OnInit } from '@angular/core';
import { ClientDetails } from 'src/app/models/client-details.model';
import { AddClientService } from 'src/app/services/add-client.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AddAddressService } from 'src/app/services/add-address.service';
import { take } from 'rxjs';
import { Address } from 'src/app/models/address.model';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  providers: [AddClientService]
})


export class AddAddressComponent{
  defaultDevice={
    name : [""],
  };
  defaultAddress={
    devices: this.fb.array([this.fb.group(this.defaultDevice)]),
    streetNumber: [""],
    town: [""],
    zip: [""]
  };
  clients: ClientDetails[];
  selectedClient: ClientDetails[];
  addressForm = this.fb.group({
    client: [this.addClientService.clientDetails.firstName, Validators.required],
    addresses: this.fb.array([this.fb.group({
      devices: this.fb.array([this.fb.group(this.defaultDevice)]),
      streetNumber: [this.getAddress().streetNumber, [Validators.required]],
      town: [this.getAddress().town, [Validators.required]],
      zip: [this.getAddress().zip, [Validators.required]],
    })])

  });
  constructor(private addClientService: AddClientService, private fb: FormBuilder, private addAddressService: AddAddressService) {

    this.clients = [
      { firstName: 'Stachu ', lastName: 'Johnes', phoneNumber: '997 997 997', email: 'staszek@wp.pl' },
      { firstName: 'Zdzichu ', lastName: 'Ogórek', phoneNumber: '123 997 997', email: 'zdzisiu@wp.pl' },
      { firstName: 'Krzysztof ', lastName: 'Kononowicz', phoneNumber: '153 997 997', email: 'krzysiu@wp.pl' },
      { firstName: 'Wojciech ', lastName: 'Suchodolski', phoneNumber: '544 997 997', email: 'wojtuś@wp.pl' },
    ]
  }
  private getAddress() {
    return this.addAddressService.address;
  }
  public getDevices(address: any) {
    return (address.get('devices')! as FormArray).controls;
  }
  public get addresses() {
    return (this.addressForm.get('addresses')! as FormArray<FormGroup>).controls;
  }
  public onSubmit() {
    const address=this.addressForm.value as Address;
    console.log(this.addressForm.value);
    this.addAddressService.addAddress(address).pipe(take(1)).subscribe();
  }
  public addField(path : string, group : any){
    const fb = this.addressForm.get(path);
    (fb as FormArray).push(this.fb.group(group));
  }
}

