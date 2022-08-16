import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-serviceman',
  templateUrl: './add-serviceman.component.html',
  styleUrls: ['./add-serviceman.component.scss']
})
export class AddServicemanComponent implements OnInit{
  servicemanForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.servicemanForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'phoneNumber': new FormControl(null,Validators.required),
    });
  }

  
    


}
