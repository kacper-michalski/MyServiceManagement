import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent {
  display: boolean = false;
  serviceForm: boolean = false;
  servicemans: string[] = ['Anna Pietrzak', 'Szymon Grabowski', 'Andrzej Luty'];
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  showDialog() {
    this.display = true;
  }

}
