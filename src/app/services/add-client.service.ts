import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddClientService {
  public client: Client;

  constructor(private http: HttpClient) {
    this.client = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: ""
    }
  }

  public addClient(client: any) {
    console.log(client);
    const ids: string = client.addressesId.map((obj: { addressId: string; }) => obj.addressId);
    return this.http.post<Client>('http://localhost:8080/customer', { ...client, idAddresses: ids });
  }
}