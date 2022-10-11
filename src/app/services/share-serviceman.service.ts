import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServicemanDetails } from '../models/serviceman-details.model';
@Injectable({
  providedIn: 'root'
})
export class ShareServicemanService {
    public serviceman$ = new BehaviorSubject<any>('');
    selectedServiceman$ = this.serviceman$.asObservable();
  constructor() {
  }
  setServiceman(serviceman: ServicemanDetails) {
    this.serviceman$.next(serviceman);
  }
}
