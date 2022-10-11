import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { AddServiceService } from 'src/app/services/add-service.service';
import { AddServicemanService } from 'src/app/services/add-serviceman.service';
import { AddAddressService } from 'src/app/services/add-address.service';
import { AddClientService } from 'src/app/services/add-client.service';
import { AddCompanyService } from 'src/app/services/add-company.service';
import { AddDeviceService } from 'src/app/services/add-device.service';
import * as dayjs from 'dayjs';
import { ShareDateService } from 'src/app/services/share-date.service';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent {
  @Input() display: boolean;
  @Output() toggle = new EventEmitter();
  // date: string = '27-07-2022';
  technican: string = 'Kacper Michalski';
  page: number;
  checked: boolean;
  public hours: string[] = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
  public minutes: string[] = ['00', '15', '30', '45'];
  public selectedHourFrom: number=6;
  public selectedMinuteFrom: number=0;
  public selectedHourTo: number=6;
  public selectedMinuteTo: number=0;
  public selectedDay: string;
  serviceForm = this.fb.group({
    address: this.fb.group({
      checkbox: [''],
      street: [this.addAddressService.address.street, Validators.required],
      zipCode: [this.addAddressService.address.zipCode, Validators.required],
      city: [this.addAddressService.address.city, Validators.required]
    }),
    customer: this.fb.group({
      checkbox: [''],
      firstName: [this.addClientService.client.firstName, Validators.required],
      lastName: [this.addClientService.client.lastName, Validators.required],
      phoneNumber: [this.addClientService.client.phoneNumber, Validators.required],
      email: [this.addClientService.client.email, Validators.required]
    }),
    company: this.fb.group({
      checkbox: [''],
      name: [this.addCompanyService.company.name, Validators.required],
      tin: [this.addCompanyService.company.tin, Validators.required],
      street: [this.addCompanyService.company.street, Validators.required],
      zipCode: [this.addCompanyService.company.zipCode, Validators.required],
      city: [this.addCompanyService.company.city, Validators.required]
    }),
    device: this.fb.group({
      checkbox: [''],
      idFactory: [this.addDeviceService.device.idFactory, Validators.required],
      serialNumber: [this.addDeviceService.device.idFactory, Validators.required],
      idFd: [this.addDeviceService.device.idFactory, Validators.required],
      catalogNumber: [this.addDeviceService.device.catalogNumber, Validators.required]
    }),
    task: this.fb.group({
      description: [this.addServiceService.service.description, Validators.required],
      minPrice: [this.addServiceService.service.minPrice, Validators.required],
      maxPrice: [this.addServiceService.service.maxPrice, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      date: [''],
      idTechnician: ['1', Validators.required]
    })
  });
  constructor(private fb: FormBuilder, private addAddressService: AddAddressService, private addClientService: AddClientService, private addCompanyService: AddCompanyService, private addDeviceService: AddDeviceService, private addServiceService: AddServiceService, private addServicemanService: AddServicemanService, private primengConfig: PrimeNGConfig, private shareDateService: ShareDateService) { }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.page = 1;
    this.checked = false;
    this.shareDateService.selectedDate$.subscribe((value: Date)=>{
      this.selectedDay=dayjs(value).format('YYYY-MM-DD');
      this.serviceForm.get('task')?.get('date')?.setValue(this.selectedDay);
    });
  }

  private getServiceman() {
    return this.addServicemanService.servicemanDetails;
  }
  public getDevices(address: any) {
    return (address.get('devices')! as FormArray).controls;
  }
  public onSubmit() {
    console.log(dayjs(this.serviceForm.get('task')?.get('startTime')?.value).format('HH-mm'));
    const service = this.serviceForm.value as Service;
    this.addServiceService.addService(service).pipe(take(1)).subscribe();
    this.serviceForm.reset();
  }

  public onClickNextPage() {
    this.page += 1;
    console.log(this.selectedDay);
    if(this.page===6){
      this.serviceForm.patchValue({
        task:{
          startTime: this.hours[this.selectedHourFrom]+':'+this.minutes[this.selectedMinuteFrom],
          endTime: this.hours[this.selectedHourTo]+':'+this.minutes[this.selectedMinuteTo],
        }
      });
    }
  }
  public onClickUp(){

  }
  public onClickChevronUpHourFrom() {
    if (this.selectedHourFrom === 15) {
      this.selectedHourFrom = 0;
    }
    else{
      this.selectedHourFrom += 1;
    }
  }
  public onClickChevronDownHourFrom() {
    if (this.selectedHourFrom === 0) {
      this.selectedHourFrom = 15;
    }
    else{
      this.selectedHourFrom -= 1;
    }
  }
  public onClickChevronUpMinuteFrom() {
    if (this.selectedMinuteFrom === 3) {
      this.selectedMinuteFrom = 0;
    }
    else{
      this.selectedMinuteFrom += 1;
    }
  }
  public onClickChevronDownMinuteFrom() {
    if (this.selectedMinuteFrom === 0) {
      this.selectedMinuteFrom = 3;
    }
    else{
      this.selectedMinuteFrom -= 1;
    }
  }
  public onClickChevronUpHourTo() {
    if (this.selectedHourTo === 15) {
      this.selectedHourTo = 0;
    }
    else{
      this.selectedHourTo += 1;
    }

  }
  public onClickChevronDownHourTo() {
    if (this.selectedHourTo ===0) {
      this.selectedHourTo = 15;
    }
    else{
      this.selectedHourTo -= 1;
    }

  }
  public onClickChevronUpMinuteTo() {
    if (this.selectedMinuteTo === 3) {
      this.selectedMinuteTo = 0;
    }
    else{
      this.selectedMinuteTo += 1;
    }
  }
  public onClickChevronDownMinuteTo() {
    if (this.selectedMinuteTo === 0) {
      this.selectedMinuteTo = 3;
    }
    else{
      this.selectedMinuteTo -= 1;
    }
  }
  hideDialog() {
    this.display = false;
    this.toggle.emit(this.display);
  }
}
