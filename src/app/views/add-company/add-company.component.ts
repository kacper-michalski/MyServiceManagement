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
    name: [this.getCompany().name, [Validators.required]],
    tin: [this.getCompany().tin, [Validators.required]],
    street: [this.getCompany().street, [Validators.required]],
    zipCode: [this.getCompany().zipCode, [Validators.required]],
    city: [this.getCompany().city, [Validators.required]]
  });
  constructor(private fb: FormBuilder, private addCompanyService: AddCompanyService) { }

  private getCompany() {
    return this.addCompanyService.company;
  }

  public onSubmit() {
    const company = this.companyForm.value as Company
    this.addCompanyService.addCompany(company).pipe(take(1)).subscribe();
    this.companyForm.reset();
  }

}
