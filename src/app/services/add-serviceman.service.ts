import { Injectable } from '@angular/core';
import { ServicemanDetails } from '../models/serviceman-details.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddServicemanService {
  public servicemanDetails: ServicemanDetails;
  
  constructor(private http: HttpClient) {
    this.servicemanDetails = {
      name: "",
      phoneNumber: "",
      email: ""
    }
  }
  public addServiceman(serviceman: ServicemanDetails) {
    console.log(serviceman)
    return this.http.post<ServicemanDetails>('http://localhost:3000/serviceman', serviceman);
  }
}
