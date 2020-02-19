import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatFormFieldControl} from "@angular/material";
import {FormBuilder, Validators, FormControl, FormGroup, AbstractControl} from "@angular/forms";
import {SocietyService, Society} from "../society.service"
import { formatDate, DatePipe } from '@angular/common';
import {Driver, DriverService, User} from "../driver.service";
import {Car, CarService} from "../car.service";
import { Observable, observable } from 'rxjs';
import { ArrayDataSource } from '@angular/cdk/collections';
import { AdminService } from '../admin.service';

@Component({
  selector: 'socadd-dialog',
  templateUrl: './socadd-dialog.component.html',
  // styleUrls: ['./socadd-dialog.component.css']
})
export class SocaddDialogComponent implements OnInit {
  form: FormGroup;
  driverList: any = [];
  ownerListFilter: any = [];
  carList: Car[];
  carListFilter: any = [];
  validation_messages: any;
  constructor(private societyService: SocietyService, private driverservice: DriverService, private carservice: CarService,
    private fb: FormBuilder, private adminS: AdminService, private dialogRef: MatDialogRef<SocaddDialogComponent>) { }

  ngOnInit() {

    this.driverservice.getAll().subscribe(res => {
      // this.driverList = res;
      // list pour les drivers
      this.driverList = res.filter(function(value) {
        return value.is_staff === false;
      });
      console.log('addsoc',this.driverList);
      // liste des proprio
      this.ownerListFilter = this.driverList.filter(function(value) {
        return value.driver.owner === true;
      });
      console.log('owner',this.ownerListFilter);
      // this.filterOwner();
    });
    this.carservice.getAll().subscribe(res => {
      this.carList = res;
      this.carListFilter = res.filter(function(value) {
        return value.society == null;
      });
      // this.filterCars();
      console.log('car', this.carList);
    });
    // console.log("table",this.driverList)
    this.validation_messages = {
      'name': [
          { type: 'required', message: 'name is required.' },
        ],
        'tva': [
          { type: 'required', message: 'TVA is required.' },
          { type: 'pattern', message: 'must be "be + 10 numbers.' }
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
    this.form = this.fb.group({
      name : ['', Validators.required, [this.checksocname()]],
      tva: ['', [Validators.required, Validators.pattern('[b][e][0-9]{10}')], [this.checktva()]],
      owners: [[], Validators.required],
      adress: ['', Validators.required],
      addnum: [Number, Validators.required],
      locality: [Number, Validators.required],
      drivers: [[], Validators.required],
      cars: [[], Validators.required]
    });
  }
  // validator nom
  checksocname(): any {
    let timer;
    return (control: AbstractControl): {[key: string]: any} | null => {
      let response;
      return new Promise(res1 => {
        timer = setTimeout(() => {
          if (control.pristine) {
            return res1(null);
          } else {
            this.societyService.findSocieties(control.value).subscribe(res => {
              response = res;
              // console.log('nopif', control.value, response);
              return res1(res ? {'nop': {value: true}} : null);
            });
          }
        }, 300);
      });
    };
  }
  // validator tva
  checktva(): any {
    let timer;
    return (control: AbstractControl): {[key: string]: any} | null => {
      let response;
      return new Promise(res1 => {
        timer = setTimeout(() => {
          if (control.pristine) {
            return res1(null);
          } else {
            this.societyService.findTVA(control.value).subscribe(res => {
              response = res;
              // console.log('nopif', control.value, response);
              return res1(res ? {'nop': {value: true}} : null);
            });
          }
        }, 300);
      });
    };
  }
  // filtre les voitures qui n'ont pas de société
  // filterCars() {
  //   this.carList.forEach(element => {
  //     if (element.society == null) {
  //       this.carListFilter.push(element);
  //     }
  //   });
  //   console.log('filter car', this.carListFilter);
  // }
  // // filtre les proprios
  // filterOwner() {
  //   this.driverList.forEach(element => {
  //     if (element.driver.owner === true) {
  //       this.ownerListFilter.push(element);
  //     }
  //   });
  // }

  save() {
    this.dialogRef.close(this.societyService.createsoc(this.form.value).subscribe(()=>{
      console.log('ok')
    }));
    console.log('save:' + this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
