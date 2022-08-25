import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
@Injectable({
  providedIn: 'root'
})
export class AddAddressService {
  public address: Address;
  constructor(private http: HttpClient) {
    this.address = {
      streetNumber: "",
      zip: "",
      town: "",
      devices: [],
    }
  }
  public addAddress(address: Address) {
    return this.http.post<Address>('http://localhost:3000/address', address);
  }
}
