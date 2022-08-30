import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddServiceService {
  public service: Service;
  
  constructor(private http: HttpClient) {
    this.service = {
      description: "",
      date: new Date(),
      commencement: "",
      termination: "",
      status: "",
      price: "",
    }
  }
  public addService(service: Service) {
    return this.http.post<Service>('http://localhost:3000/service', service);
  }
}
