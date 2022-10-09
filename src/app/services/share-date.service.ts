import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShareDateService {
    public date$ = new BehaviorSubject<any>(Date());
    selectedDate$ = this.date$.asObservable();
  constructor() {
  }
  setDate(date: Date) {
    this.date$.next(date);
  }
}
