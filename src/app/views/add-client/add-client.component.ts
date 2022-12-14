import { Component } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { AddClientService } from 'src/app/services/add-client.service';
import { Client } from 'src/app/models/client.model';
import { take } from "rxjs";
import { ShowDropDownService } from 'src/app/services/show-dropdown.service';
import { DropDown } from 'src/app/models/dropDown.model';
import { Company } from 'src/app/models/company.model';
import { Address } from 'src/app/models/address.model';
import { AddAddressService } from 'src/app/services/add-address.service';
import { AddCompanyService } from 'src/app/services/add-company.service';

interface address1 {
  name: string,
  id: string
}
interface company1 {
  name: string,
  tin: string
}
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
  companies: Company[];
  addressesMOCK: address1[];
  companiesMOCK: company1[];
  selectedAddress: string;
  selectedCompany: string;
  defaultAddress = {
    addressId: [""],
  };
  clientForm = this.fb.group({
    firstName: [this.getClient().firstName, [Validators.required,]],
    lastName: [this.getClient().lastName, [Validators.required,]],
    phoneNumber: [this.getClient().phoneNumber, [Validators.required, Validators.minLength(9)]],
    email: [this.getClient().email, [Validators.required, Validators.email]],
    addressesId: this.fb.array([this.fb.group({
      addressId: [this.getAddress().street, [Validators.required]]
    })]),
    tin: [this.getCompany().tin, [Validators.required]]
  });
  constructor(private fb: FormBuilder, private addClientService: AddClientService, public showDropDownService: ShowDropDownService, private addAddressService: AddAddressService, private addCompanyService: AddCompanyService) {
    this.companiesMOCK = [
      { name: 'optica ' + '\n' + '8378245074' + '\n' + 'Pana Tadeusza 9' + '\n' + '02-964' + '\n' + 'Rzeszów', tin: '5223130908' },
      { name: 'ukom' + '\n' + '1259726332' + '\n' + 'Europejska 94' + '\n' + '20-609' + '\n' + 'Warszawa', tin: '9181733595' },
      { name: 'sllegro ' + '\n' + '8114516680' + '\n' + 'Bałtycka 12' + '\n' + '90-215' + '\n' + 'Bydgoszcz', tin: '9181733595' }
    ],
      this.addressesMOCK = [
        { name: 'Centralna 54' + '\n' + '31-521 Białystok', id: '1' },
        { name: 'Koszalińska 39' + '\n' + '42-605 Kraków', id: '2' },
        { name: 'Beliny Prażmowskiego 6' + '\n' + '44-164 Radom', id: '3' },
        { name: 'Sikorskiego Władysława 144' + '\n' + '84-230 Katowice', id: '4' },
      ]
  }

  private getClient() {
    return this.addClientService.client;
  }
  private getCompany(){
    return this.addCompanyService.company;
  }

  public onSubmit() {
    const client = this.clientForm.value as Client;
    this.addClientService.addClient(client).pipe(take(1)).subscribe();
    this.clientForm.reset();

  }
  public onClickDropDown(key: keyof DropDown) {
    this.showDropDownService.onClickDropDown(key);
  }
  public onSelectCompany(company: Company) {
    return this.showDropDownService.onSelectCompany(company);
  }
  public onSelectAddress(address: Address) {
    return this.showDropDownService.onSelectAddress(address);
  }
  private getAddress() {
    return this.addAddressService.address;
  }
  public get addresses() {
    return (this.clientForm.get('addressesId')! as FormArray<FormGroup>).controls;
  }
  public addField(path: string, group: any) {
    const fb = this.clientForm.get(path);
    (fb as FormArray).push(this.fb.group(group));
  }
}

