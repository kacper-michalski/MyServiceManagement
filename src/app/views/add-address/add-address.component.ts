import { Component, OnInit } from '@angular/core';
import { ClientDetails } from 'src/app/models/client-details.model';
import { AddClientService } from 'src/app/services/add-client.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
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


export class AddAddressComponent implements OnInit {
  clients: ClientDetails[];
  selectedClient: ClientDetails[];
  addressNumber: number = 1;
  addressForm = this.fb.group({
    devices: this.fb.array([]),
    // device: [this.getAddress().device, [Validators.required,]],
    streetNumber: [this.getAddress().streetNumber, [Validators.required, Validators.minLength(9)]],
    town: [this.getAddress().town, [Validators.required, Validators.email]],
    zip: [this.getAddress().zip, [Validators.required]],
  });
  constructor(private addClientService: AddClientService, private fb: FormBuilder, private addAddressService: AddAddressService) {

    this.clients = [
      { name: 'Stachu Johnes', phoneNumber: '997 997 997', companyName: 'FIRMA INKO', TIN: '429 111 59 09', email: 'staszek@wp.pl' },
      { name: 'Zdzichu Ogórek', phoneNumber: '123 997 997', companyName: 'FIRMA WINKO', TIN: '659 111 59 09', email: 'zdzisiu@wp.pl' },
      { name: 'Krzysztof Kononowicz', phoneNumber: '153 997 997', companyName: 'FIRMA PIWKO', TIN: '559 111 59 09', email: 'krzysiu@wp.pl' },
      { name: 'Wojciech Suchodolski', phoneNumber: '544 997 997', companyName: 'RUSZTOWANIE&SZKLANA', TIN: '129 111 59 09', email: 'wojtuś@wp.pl' },
    ]
  }
  ngOnInit(): void {
  }
  newDevice(): FormGroup {
    return this.fb.group({
      name: '',
    })
  }
  private getClientDetails() {
    return this.addClientService.clientDetails;
  }
  private getAddress() {
    return this.addAddressService.address;
  }
  public get devices(): FormArray {
    return this.addressForm.get("devices") as FormArray;
  }
  public onSubmit() {
    const formData = this.createFormData();
    console.log(this.addressForm.value);
    this.addAddressService.addAddress(formData).pipe(take(1)).subscribe();
  }

  private createFormData() {
    const address = this.addressForm.value as Address;
    const formData = new FormData();
    formData.append('devices', JSON.stringify(address.devices));
    //... and, correspondingly, using json_decode on server to deparse it. See, the second value of FormData.append can be...
    formData.append('streetNumber', address.streetNumber);
    formData.append('town', address.town);
    formData.append('zip', address.zip);
    return formData;
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  addAddress() {
    return this.addressNumber += 1;
  }
  addDevice() {
    this.devices.push(this.newDevice());
  }

}

