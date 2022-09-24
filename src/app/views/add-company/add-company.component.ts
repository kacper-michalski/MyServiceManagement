import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddCompanyService } from '../../services/add-company.service';
import { FormBuilder } from '@angular/forms';
import { take } from "rxjs";
import { Company } from 'src/app/models/company.model';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
  companyForm = this.fb.group({
    name: [this.getCompany().companyName, [Validators.required]],
    tin: [this.getCompany().TIN, [Validators.required]],
    street: [this.getCompany().streetNumber, [Validators.required]],
    zipCode: [this.getCompany().zip, [Validators.required]],
    city: [this.getCompany().town, [Validators.required]]
  });
  constructor(private fb: FormBuilder, private addCompanyService: AddCompanyService) { }

  private getCompany() {
    return this.addCompanyService.company;
  }

  public onSubmit() {
    const company = this.companyForm.value as Company
    this.addCompanyService.addCompany(company).pipe(take(1)).subscribe();
  }

}
