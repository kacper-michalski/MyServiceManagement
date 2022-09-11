import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { ClientDetails } from 'src/app/models/client-details.model';
import { AddClientService } from 'src/app/services/add-client.service';
import { AddServiceService } from 'src/app/services/add-service.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddAddressService } from 'src/app/services/add-address.service';
import { take } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { AddServicemanService } from 'src/app/services/add-serviceman.service';
import { ServicemanDetails } from 'src/app/models/serviceman-details.model';
import { ShowDropDownService } from 'src/app/services/show-dropdown.service';
import { DropDown } from 'src/app/models/dropDown.model';
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
  clients: ClientDetails[];
  addresses: Address[];
  statuses = ['Utworzona', 'Przekazana', 'Zamknięta'];
  serviceTechnicians: ServicemanDetails[];
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
  constructor(private addClientService: AddClientService, private fb: FormBuilder, private addAddressService: AddAddressService, private addServiceService: AddServiceService, private addServicemanService: AddServicemanService, public showDropDownService: ShowDropDownService) {

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
  public onClickDropDown(key: keyof DropDown) {
    this.showDropDownService.onClickDropDown(key);
  }
  public onSelectClient(client: ClientDetails) {
    return this.showDropDownService.onSelectClient(client);
  }
  public onSelectAddress(address: Address) {
    return this.showDropDownService.onSelectAddress(address);
  }
  public onSelectDevice(iDevice: number) {
    return this.showDropDownService.onSelectDevice(iDevice);
  }
  public onSelectServiceman(serviceman: ServicemanDetails) {
    return this.showDropDownService.onSelectServiceman(serviceman);
  }
  public onSelectStatus(status: string) {
    return this.showDropDownService.onSelectStatus(status);
  }
}
