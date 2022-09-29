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
    client: [this.addClientService.clientDetails.firstName, Validators.required],
    address: [this.addAddressService.address.street, Validators.required],
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
      { firstName: 'Stachu ', lastName: 'Johnes', phoneNumber: '997 997 997', email: 'staszek@wp.pl' },
      { firstName: 'Zdzichu ', lastName: 'Ogórek', phoneNumber: '123 997 997', email: 'zdzisiu@wp.pl' },
      { firstName: 'Krzysztof ', lastName: 'Kononowicz', phoneNumber: '153 997 997', email: 'krzysiu@wp.pl' },
      { firstName: 'Wojciech ', lastName: 'Suchodolski', phoneNumber: '544 997 997', email: 'wojtuś@wp.pl' },
    ],
      this.addresses = [
        { street: 'Szkolna 17', zipCode: '69-997', city: 'Białystok'},
        { street: 'Szkolna 15', zipCode: '69-997', city: 'Białystok'},
        { street: 'Boboli 8', zipCode: '69-997', city: 'Białystok' },
        { street: 'Boboli 10', zipCode: '69-997', city: 'Białystok' },
      ]
      ,
      this.serviceTechnicians = [
        { name: 'Kacper Michalski', phoneNumber: '997 997 997', email: 'kacper@wp.pl' },
        { name: 'Wojciech Sadkowski', phoneNumber: '123 123 123', email: 'Wojciech@wp.pl' },
        { name: 'Andrzej Jaki', phoneNumber: '555 555 555', email: 'Andrzej@wp.pl' },
        { name: 'Ewa Szpytma', phoneNumber: '888 888 888', email: 'Ewa@wp.pl' },
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
    this.serviceForm.reset();

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
