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
      street: "",
      zipCode: "",
      city: "",
    }
  }
  public addAddress(address: any) {
    
    const idDevices: string[] = [address.serialNumber + address.catalogNumber];
    console.log({ ...address, idDevices: idDevices });
    return this.http.post<Address>('http://localhost:8080/address', { ...address, idDevices: idDevices });
  }
}
