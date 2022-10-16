import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { AddServiceService } from 'src/app/services/add-service.service';
import { AddAddressService } from 'src/app/services/add-address.service';
import { AddClientService } from 'src/app/services/add-client.service';
import { AddCompanyService } from 'src/app/services/add-company.service';
import { AddDeviceService } from 'src/app/services/add-device.service';
import * as dayjs from 'dayjs';
import { ShareDateService } from 'src/app/services/share-date.service';
import { ServicemanDetails } from 'src/app/models/serviceman-details.model';
import { ShareServicemanService } from 'src/app/services/share-serviceman.service';
import { ScheduleComponent } from '../schedule/schedule.component';
import { CalendarComponent } from '../calendar/calendar.component';

interface Time{
  from :{
    hours: number,
    minutes: number
  },
  to :{
    hours: number,
    minutes: number
  }
}
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})

export class AddServiceComponent implements OnDestroy, OnInit {
  private ngUnsubscribe = new Subject<void>();
  @Input() display: boolean;
  @Output() toggle = new EventEmitter();
  page: number;
  public hours: string[] = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
  public minutes: string[] = ['00', '15', '30', '45'];
  public selectedDay: string;
  public selectedServiceman: ServicemanDetails;
  public disabled: boolean = false;
  public time: Time;
  serviceForm = this.fb.group({
    address: this.fb.group({
      checkbox: [false,{nonNullable: true}],
      street: [this.addAddressService.address.street, Validators.required],
      zipCode: [this.addAddressService.address.zipCode, [Validators.required,Validators.pattern('[0-9]{2}-[0-9]{3}')]],
      city: [this.addAddressService.address.city, [Validators.required,Validators.pattern('[a-zA-Z ]*')]]
    }),
    customer: this.fb.group({
      checkbox: [false, {nonNullable: true}],
      firstName: [this.addClientService.client.firstName, [Validators.required,Validators.pattern('[a-zA-Z]*')]],
      lastName: [this.addClientService.client.lastName, [Validators.required,Validators.pattern('[a-zA-Z]*')]],
      phoneNumber: [this.addClientService.client.phoneNumber, Validators.required],
      email: [this.addClientService.client.email, [Validators.required, Validators.email]]
    }),
    company: this.fb.group({
      checkbox: [false, {nonNullable: true}],
      name: [this.addCompanyService.company.name, Validators.required],
      tin: [this.addCompanyService.company.tin, [Validators.required,Validators.pattern('[0-9]{10}')]],
      street: [this.addCompanyService.company.street, Validators.required],
      zipCode: [this.addCompanyService.company.zipCode, [Validators.required,Validators.pattern('[0-9]{2}-[0-9]{3}')]],
      city: [this.addCompanyService.company.city, [Validators.required,Validators.pattern('[a-zA-Z ]*')]]
    }),
    device: this.fb.group({
      checkbox: [false, {nonNullable: true}],
      idFactory: [this.addDeviceService.device.idFactory,  [Validators.required,Validators.pattern('[0-9]{4}')]],
      serialNumber: [this.addDeviceService.device.idFactory,  [Validators.required,Validators.pattern('[0-9]{6}')]],
      idFd: [this.addDeviceService.device.idFactory,  [Validators.required,Validators.pattern('[0-9]{3}')]],
      catalogNumber: [this.addDeviceService.device.catalogNumber, [Validators.required,Validators.pattern('[0-9]{10}')]]
    }),
    task: this.fb.group({
      description: [this.addServiceService.service.description, Validators.required],
      minPrice: [this.addServiceService.service.minPrice, [Validators.required ,Validators.pattern('[0-9]*')]],
      maxPrice: [this.addServiceService.service.maxPrice, Validators.pattern('[0-9]*')],
      startTime: [''],
      endTime: [''],
      date: [''],
      idTechnician: ['']
    })
  });
  constructor(private fb: FormBuilder, private addAddressService: AddAddressService, private addClientService: AddClientService,
     private addCompanyService: AddCompanyService, private addDeviceService: AddDeviceService, private addServiceService: AddServiceService,
     private primengConfig: PrimeNGConfig, private shareDateService: ShareDateService, private shareServicemanService: ShareServicemanService,
     private scheduleComponent: ScheduleComponent, private calendarComponent: CalendarComponent) {}
  ngOnInit() {
    this.time ={
      from :{
        hours: 6,
        minutes: 0
      },
      to :{
        hours: 6,
        minutes: 0
      }};
    this.primengConfig.ripple = true;
    this.page = 1;
    this.shareDateService.selectedDate$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((value: Date)=>{
      this.selectedDay=dayjs(value).format('YYYY-MM-DD');
      this.serviceForm.get('task')?.get('date')?.setValue(this.selectedDay);
      console.log('ustawiono date ', this.selectedDay);
    });
    this.shareServicemanService.selectedServiceman$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((value: ServicemanDetails)=>{
      this.selectedServiceman=value;
      this.serviceForm.get('task')?.get('idTechnician')?.setValue(this.selectedServiceman.id);
      console.log('ustawiono serwisanta ', this.selectedServiceman.name);
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  public getDevices(address: any) {
    return (address.get('devices')! as FormArray).controls;
  }
  public onSubmit() {
    const service = this.serviceForm.value as Service;
    this.addServiceService.addService(service).pipe(take(1)).subscribe(()=>this.scheduleComponent.getServicesFromServiceService());
    this.serviceForm.reset();
    this.calendarComponent.onSelectedDay();
    this.page=1;
    console.log(this.serviceForm.get('address')?.get('checkbox')?.value)
  }
  public onClickNextPage() {
    this.page += 1;
    if(this.page===6){
      this.serviceForm.patchValue({
        task:{
          startTime: this.hours[this.time.from.hours]+':'+this.minutes[this.time.from.minutes],
          endTime: this.hours[this.time.to.hours]+':'+this.minutes[this.time.to.minutes],
        }
      });
    }
  }
  public onClickSkipCompany(){
    this.serviceForm.patchValue({
      company: {
        checkbox: false,
        name: '',
        tin: '',
        street: '',
        zipCode: '',
        city: ''
      }
    });
  }
  public onClickChevron(directionChevron: 'up' | 'down',directionTime: 'from' | 'to', keyTime: 'hours' | 'minutes') {
    if (directionChevron==='down') {
      if(this.time[directionTime][keyTime]===this[keyTime].length-1){
        this.time[directionTime][keyTime]=0;
      }
      else{
        this.time[directionTime][keyTime]+=1;
      }
    }
    else{
      if(this.time[directionTime][keyTime]===0){
        this.time[directionTime][keyTime]=this[keyTime].length-1;
      }
      else{
        this.time[directionTime][keyTime]-=1;
      }
    }
  }
  hideDialog() {
    this.display = false;
    this.toggle.emit(this.display);
  }
}
