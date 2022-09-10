import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { ClientDetails } from 'src/app/models/client-details.model';
import { AddClientService } from 'src/app/services/add-client.service';
import { AddServiceService } from 'src/app/services/add-service.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AddAddressService } from 'src/app/services/add-address.service';
import { take } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { AddServicemanService } from 'src/app/services/add-serviceman.service';
import { ServicemanDetails } from 'src/app/models/serviceman-details.model';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent {
  defaultDevice = {
    name: [""],
  };
  defaultAddress = {
    devices: this.fb.array([this.fb.group(this.defaultDevice)]),
    streetNumber: [""],
    town: [""],
    zip: [""]
  };
  showDropDown = {
    client: false,
    address: false,
    device: false,
    serviceman: false,
    status: false
  };
  clients: ClientDetails[];
  addresses: Address[];
  statuses = ['Utworzona', 'Przekazana', 'Zamknięta'];
  serviceTechnicians: ServicemanDetails[];
  selectedClient: string;
  selectedAddress: Address;
  selectedAddressString: string;
  selectedDevice: string;
  selectedServiceman: string;
  selectedStatus: string;
  serviceForm = this.fb.group({
    client: [this.addClientService.clientDetails.name, Validators.required],
    address: [this.addAddressService.address.streetNumber, Validators.required],
    device: [this.fb.array([this.fb.group(this.defaultDevice)])],
    description: [this.getService().description, [Validators.required]],
    date: [this.getService().date, [Validators.required]],
    commencement: [this.getService().commencement, [Validators.required]],
    termination: [this.getService().termination, [Validators.required]],
    status: [this.getService().status, [Validators.required]],
    serviceman: [this.getServiceman().name, [Validators.required]],
    price: [this.getService().price, [Validators.required]]
  });
  constructor(private addClientService: AddClientService, private fb: FormBuilder, private addAddressService: AddAddressService, private addServiceService: AddServiceService, private addServicemanService: AddServicemanService) {

    this.clients = [
      { name: 'Stachu Johnes', phoneNumber: '997 997 997', companyName: 'FIRMA INKO', TIN: '429 111 59 09', email: 'staszek@wp.pl' },
      { name: 'Zdzichu Ogórek', phoneNumber: '123 997 997', companyName: 'FIRMA WINKO', TIN: '659 111 59 09', email: 'zdzisiu@wp.pl' },
      { name: 'Krzysztof Kononowicz', phoneNumber: '153 997 997', companyName: 'FIRMA PIWKO', TIN: '559 111 59 09', email: 'krzysiu@wp.pl' },
      { name: 'Wojciech Suchodolski', phoneNumber: '544 997 997', companyName: 'RUSZTOWANIE&SZKLANA', TIN: '129 111 59 09', email: 'wojtuś@wp.pl' },
    ],
      this.addresses = [
        { streetNumber: 'Szkolna 17', zip: '69-997', town: 'Białystok', devices: ['farelka', 'pralka', 'odkurzacz', 'mikrofala'] },
        { streetNumber: 'Szkolna 15', zip: '69-997', town: 'Białystok', devices: ['spawarka'] },
        { streetNumber: 'Boboli 8', zip: '69-997', town: 'Białystok', devices: ['kuchenka gazowa'] },
        { streetNumber: 'Boboli 10', zip: '69-997', town: 'Białystok', devices: ['skoda'] },
      ]
      ,
      this.serviceTechnicians = [
        { name: 'Kacper Michalski', phoneNumber: '997 997 997' },
        { name: 'Wojciech Sadkowski', phoneNumber: '123 123 123' },
        { name: 'Andrzej Jaki', phoneNumber: '555 555 555' },
        { name: 'Ewa Szpytma', phoneNumber: '888 888 888' },
      ]
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
  }
  public onClickDropDown(key: 'address' | 'client' | 'device' | 'serviceman' | 'status') {
    this.showDropDown[key] = !this.showDropDown[key];
    Object.keys(this.showDropDown).forEach((differentKey, index)=>
    {
      const differentKey2 = differentKey as 'address' | 'client' | 'device' | 'serviceman' | 'status';
      if (key!=differentKey && this.showDropDown[differentKey2] == true) {
        this.showDropDown[differentKey2]=!this.showDropDown[differentKey2]
      }
    });
  }
  public onSelectClient(client: ClientDetails) {
    this.onClickDropDown('client');
    return this.selectedClient = client.name + '\n' + client.phoneNumber + '\n' + client.email + '\n' + client.companyName + '\n' + client.TIN;
  }
  public onSelectAddress(address: Address) {
    this.onClickDropDown('address');
    this.selectedAddress = address;
    return this.selectedAddressString = address.streetNumber + '\n' + address.zip + '\n' + address.town;
  }
  public onSelectDevice(selectedAddress: Address, iDevice: number) {
    this.onClickDropDown('device');
    return this.selectedDevice = selectedAddress.devices[iDevice];
  }
  public onSelectServiceman(serviceman: ServicemanDetails) {
    this.onClickDropDown('serviceman');
    return this.selectedServiceman = serviceman.name;
  }
  public onSelectStatus(status: string) {
    this.onClickDropDown('status');
    return this.selectedStatus = status;
  }
}
