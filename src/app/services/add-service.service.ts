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
      minPrice: "",
      maxPrice: "",
      startTime: "",
      endTime: ""
    }
  }
  public addService(service: Service) {
    console.log(service);
    return this.http.post<Service>('http://localhost:8080/task/form', service);
  }
}
