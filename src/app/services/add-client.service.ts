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
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: ""
    }
  }

  public addClient(client: any) {
    console.log(client);
    const ids: string = client.addressesId.map((obj: { addressId: string; }) => obj.addressId);
    return this.http.post<ClientDetails>('http://localhost:8080/customer', { ...client, idAddresses: ids });
  }
}