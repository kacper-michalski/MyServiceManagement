import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddClientService {

  constructor() { }

// public addClient(client: FormData) {
//   return this.http.post<ServicemanDetails>('http://localhost:3000/serviceman', serviceman);
// }
}