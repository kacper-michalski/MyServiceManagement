import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AddClientService } from 'src/app/services/add-client.service';
import { ClientDetails } from 'src/app/models/client-details.model';
import { take } from "rxjs";
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
  clientForm = this.fb.group({
    name: [this.getClientDetails().name, [Validators.required,]],
    phoneNumber: [this.getClientDetails().phoneNumber, [Validators.required, Validators.minLength(9)]],
    email: [this.getClientDetails().email, [Validators.required, Validators.email]],
    companyName: [this.getClientDetails().companyName, [Validators.required]],
    TIN: [this.getClientDetails().TIN, [Validators.required]],
  });
  constructor(private fb: FormBuilder, private addClientService: AddClientService) { }

  private getClientDetails() {
    return this.addClientService.clientDetails;
  }


  public onSubmit() {
    const formData = this.createFormData();
    this.addClientService.addClient(formData).pipe(take(1)).subscribe();
  }

  private createFormData() {
    const client = this.clientForm.value as ClientDetails;
    const formData = new FormData();
    formData.append('name', client.name);
    formData.append('phoneNumber', client.phoneNumber);
    formData.append('email', client.email);
    formData.append('companyName', client.companyName);
    formData.append('TIN', client.TIN);
    return formData;
  }
}
