import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { take } from 'rxjs';
import { Services } from 'src/app/models/services.model';
import { AddServiceService } from 'src/app/services/add-service.service';
import { ShareDateService } from 'src/app/services/share-date.service';
import { ServicemanDetails } from 'src/app/models/serviceman-details.model';
import { AddServicemanService } from 'src/app/services/add-serviceman.service';
import { ShareServicemanService } from 'src/app/services/share-serviceman.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent {
  display: boolean = false;
  serviceForm: boolean = false;
  services$ = this.addServiceService.getService();
  services: Services[];
  servicers$ = this.addServicemanService.getServiceman();
  servicers: ServicemanDetails[];
  selectedDay: string;
  selectedServiceman: string;
  constructor(private addServiceService: AddServiceService, private shareDateService: ShareDateService, private addServicemanService: AddServicemanService, private shareServicemanService: ShareServicemanService){}
  ngOnInit(){
    this.services$.pipe(take(1)).subscribe((value: Services[]) => {this.services=value; console.log(value); this.mergeDateWithTime(); this.countTheServiceLenght()});
    this.servicers$.pipe(take(1)).subscribe((value: ServicemanDetails[]) => {this.servicers=value; console.log(value)});
    this.shareDateService.selectedDate$.subscribe((value: Date)=>{
      this.selectedDay=dayjs(value).format('YYYY-MM-DD');
    });
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  showDialog() {
    this.display = true;
  }

  mergeDateWithTime(){
    this.services.map(element => {element.startTime= new Date(element.date+' '+element.startTime); element.endTime=new Date(element.date+' '+element.endTime)});
  }
  countTheServiceLenght(){
    this.services.map(element => { element.length=(element.endTime.getTime()-element.startTime.getTime())/1000/60/60; element.height=(element.startTime.getTime()-(new Date(element.date+' 6:00').getTime()))/1000/60/60});
  }
  onSelectedServiceman(serviceman: ServicemanDetails) {
    this.shareServicemanService.setServiceman(serviceman);
  }
}
