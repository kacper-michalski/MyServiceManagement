import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class AddCompanyService {
    public company: Company;

    constructor(private http: HttpClient) {
        this.company = {
            name: "",
            tin: "",
            street: "",
            zipCode: "",
            city: ""
        }
    }

    public addCompany(company: Company) {
        console.log(company)
        return this.http.post<Company>('http://localhost:8080/company', company);
    }
}