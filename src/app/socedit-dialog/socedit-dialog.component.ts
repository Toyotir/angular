import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatFormFieldControl} from "@angular/material";
import {FormBuilder, Validators,FormControl, FormGroup} from "@angular/forms";
import {SocietyService,Society} from "../society.service"
import { formatDate, DatePipe } from '@angular/common';
import {Driver,DriverService, User} from "../driver.service"
import {Car,CarService} from "../car.service"
import { Observable, observable } from 'rxjs';
import { ArrayDataSource } from '@angular/cdk/collections';
import { AdminService } from '../admin.service'

@Component({
  selector: 'socedit-dialog',
  templateUrl: './socedit-dialog.component.html',
  styleUrls: ['./socedit-dialog.component.css']
})
export class SoceditDialogComponent implements OnInit {
    id:''
    name :''
    tva:''
    owners:Driver[]
    adress:''
    addnum:Number
    locality:Number
    drivers:Driver[]
    cars:Car[];
    ownerListFilter: any = [];
    validation_messages: any;
  constructor(private societyService:SocietyService,private driverservice:DriverService,private carservice:CarService,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private adminS: AdminService,private dialogRef : MatDialogRef<SoceditDialogComponent>) {
      this.id = data.id
      this.name = data.name
      this.tva = data.tva
      this.owners = data.owners
      this.adress = data.adress
      this.addnum = data.addnum
      this.locality = data.locality
      this.drivers = data.drivers
      this.cars = data.cars
    }
    form:FormGroup;
    driverList: User[]
    carList:Car[]
    carListFilter:any=[]

  ngOnInit() {
    console.log('data recu',this.data)
    this.driverservice.getAll().subscribe(res => {
      this.driverList = res.filter(function(value) {
        return value.is_staff === false;
      });
      this.ownerListFilter = this.driverList.filter(function(value) {
        return value.driver.owner === true;
      });
    });
    this.carservice.getAll().subscribe(res=>{this.carList=res;this.filterCars()})
    this.form = this.fb.group({
      id : this.id,
      name : this.name,
      tva: this.tva,
      owners:this.owners,
      adress:this.adress,
      addnum:this.addnum,
      locality:this.locality,
      drivers:this.drivers,
      cars:this.cars
    });
    this.validation_messages = {
      'name': [
          { type: 'required', message: 'name is required.' },
        ],
        'tva': [
          { type: 'required', message: 'TVA is required.' },
          // { type: 'pattern', message: 'must be "be + 10 numbers.' }
        ],
        'owners': [
          { type: 'required', message: 'owners is required.' }
        ],
        'adress': [
          { type: 'required', message: 'adress  is required.' }
        ],
        'addnum': [
          { type: 'required', message: 'number  is required.' }
        ],
        'locality': [
          { type: 'required', message: 'locality is required.' }
        ],
        'drivers': [
          { type: 'required', message: 'drivers is required.' }
        ],
        'cars': [
          { type: 'required', message: 'cars is required.' }
        ],
    };
  }

  filterCars(){
    this.carList.forEach(element => {
      if(element.society == null || element.society == this.id){
        this.carListFilter.push(element)
      }
    });
    console.log('filter car',this.carListFilter)
  }
  compareFn(d1: {value: string}, d2: {value: string}) {
    console.log(d1,"===",d2)
    return d1 === d2 ? true : false;

    // if (d1 === d2)
    //   return true
    // else return false

    // return d1 && d2 && d1.value === d2.value;
    // this.driverList.forEach(d => {
    //   if(d.id === this.owner)
    //     return true;
    // })

  };
  compareFns(d1: {value: string}, d2: {value: string}) {
    console.log("compare multiple",d1,"===",d2)
    return d1 === d2 ? true : false;
    // for(let x = 0;this.driverList.length;++x){
    //   if (d1 === d2)
    //     return true
    //   else return false

    // }


    // return d1 && d2 && d1.value === d2.value;
    // this.driverList.forEach(d => {
    //   if(d.id === this.owner)
    //     return true;
    // })

  };




  save(){
    console.log("send to updateSErv",this.form)
    this.dialogRef.close(this.societyService.updateSociety(this.form.value).subscribe(res=>{console.log(this.form.value);return res}));
    // this.dialogRef.close(this.societyService.updateSociety(this.data).subscribe());
    // console.log('save:'+this.form.value);
  }
  close(){
    this.dialogRef.close();
  }




}
