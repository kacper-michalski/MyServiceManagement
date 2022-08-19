import { Injectable } from '@angular/core';
import { ClientDetails } from '../models/client-details.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddClientService {
  public clientDetails: ClientDetails;

  constructor(private http: HttpClient) {
    this.clientDetails = {
      name: "",
      phoneNumber: "",
      companyName: "",
      TIN: "",
      email: ""
    }
  }

  public addClient(client: FormData) {
    return this.http.post<ClientDetails>('http://localhost:3000/client', client);
  }
}