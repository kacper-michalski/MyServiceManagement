import { Component } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { AddClientService } from 'src/app/services/add-client.service';
import { ClientDetails } from 'src/app/models/client-details.model';
import { take } from "rxjs";
import { ShowDropDownService } from 'src/app/services/show-dropdown.service';
import { DropDown } from 'src/app/models/dropDown.model';
import { Company } from 'src/app/models/company.model';
import { Address } from 'src/app/models/address.model';
import { AddAddressService } from 'src/app/services/add-address.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
  companies: Company[];
  addressesMOCK: Address[];
  selectedAddress: string;
  defaultAddress={
    streetNumber: [""],
    town: [""],
    zip: [""]
  };
  clientForm = this.fb.group({
    firstName: [this.getClientDetails().firstName, [Validators.required,]],
    lastName: [this.getClientDetails().lastName, [Validators.required,]],
    phoneNumber: [this.getClientDetails().phoneNumber, [Validators.required, Validators.minLength(9)]],
    email: [this.getClientDetails().email, [Validators.required, Validators.email]],
    addresses: this.fb.array([this.fb.group({
      streetNumber: [this.getAddress().streetNumber, [Validators.required]],
      town: [this.getAddress().town, [Validators.required]],
      zip: [this.getAddress().zip, [Validators.required]]
    })])
  });
  constructor(private fb: FormBuilder, private addClientService: AddClientService, public showDropDownService: ShowDropDownService, private addAddressService: AddAddressService) {
    this.companies = [
      { name: 'optica ', tin: '8378245074', street: 'Pana Tadeusza 9', zipCode: '02-964', city: 'Rzeszów' },
      { name: 'ukom', tin: '1259726332', street: 'Europejska 94', zipCode: '20-609', city: 'Warszawa' },
      { name: 'sllegro ', tin: '8114516680', street: 'Bałtycka 12', zipCode: '90-215', city: 'Bydgoszcz' }
    ],
    this.addressesMOCK = [
      { streetNumber: 'Szkolna 17', zip: '69-997', town: 'Białystok', devices: ['farelka', 'pralka', 'odkurzacz', 'mikrofala'] },
      { streetNumber: 'Szkolna 15', zip: '42-605', town: 'Białystok', devices: ['spawarka'] },
      { streetNumber: 'Boboli 8', zip: '44-164', town: 'Białystok', devices: ['kuchenka gazowa'] },
      { streetNumber: 'Boboli 10', zip: '84-230', town: 'Białystok', devices: ['skoda'] },
    ]
   }

  private getClientDetails() {
    return this.addClientService.clientDetails;
  }


  public onSubmit() {
    const client = this.clientForm.value as ClientDetails;
    this.addClientService.addClient(client).pipe(take(1)).subscribe();
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
    return (this.clientForm.get('addresses')! as FormArray<FormGroup>).controls;
  }
  public addField(path : string, group : any){
    const fb = this.clientForm.get(path);
    (fb as FormArray).push(this.fb.group(group));
  }
}

