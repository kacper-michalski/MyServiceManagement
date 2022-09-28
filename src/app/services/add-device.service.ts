import { Injectable } from '@angular/core';
import { Device } from '../models/device.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddDeviceService {
  public device: Device;
  constructor(private http: HttpClient) { 
    this.device = {
      idFactory: "",
      idFd: "",
      serialNumber: "",
      catalogNumber: ""
    }
  }
  public addDevice(device: any) {
    const id: String = device.serialNumber + device.catalogNumber;
    return this.http.post<Device>('http://localhost:8080/device', { ...device, id: id });
  }

}
