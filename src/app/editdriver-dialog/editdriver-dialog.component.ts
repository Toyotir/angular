import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatFormFieldControl } from "@angular/material";
import { FormBuilder, Validators, FormControl, FormGroup } from "@angular/forms";
import { formatDate, DatePipe } from '@angular/common';
import { Driver, DriverService } from "../driver.service"
import { Observable, observable } from 'rxjs';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'editdriver-dialog',
  templateUrl: './editdriver-dialog.component.html',
  styleUrls: ['./editdriver-dialog.component.css']
})
export class EditdriverDialogComponent implements OnInit {
  id: '';
  last_name: string;
  first_name: '';
  username: '';
  password: '';
  is_staff: boolean;
  birthdate: Date;
  owner: boolean;
  adress: string;
  addnum: Number;
  locality: Number;
  licenseExp: Date;
  // drivers:Driver[]

  constructor(private driverservice: DriverService, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private dialogRef: MatDialogRef<EditdriverDialogComponent>) {
    this.id = data.id;
    this.driverservice.getUser(data.id).subscribe(res => {
      console.log('testgetuser', res.driver.birthdate, res.driver.owner, res);
        this.last_name = res.lastname,
        this.birthdate = res.driver.birthdate,
        this.owner = res.driver.owner,
        this.adress = res.driver.adress,
        this.addnum = res.driver.addnum,
        this.locality = res.driver.locality,
        this.licenseExp = res.driver.licenseExp,
        console.log('testgetuser2', data);
    });
    this.form = this.fb.group({
      id: this.id,
      last_name: this.data.last_name,
      first_name: this.data.first_name,
      username: this.data.username,
      password: this.data.password,
      is_staff: this.data.is_staff,
      driver: this.fb.group({
        birthdate: this.data.birthdate,
        owner: this.data.owner,
        adress: this.data.adress,
        addnum: this.data.addnum,
        locality: this.data.locality,
        licenseExp: this.data.licenseExp
      })
    });

    // this.last_name = data.last_name
    // this.first_name = data.first_name
    // this.username = data.username
    // this.password = data.password
    // this.is_staff = data.is_staff
    // this.birthdate = data.birthdate
    // this.owner = data.owner
    // this.adress = data.adress
    // this.addnum = data.addnum
    // this.locality = data.locality
    // this.drivers = data.drivers
    console.log('fzfzefzef', this.owner);
    if (this.owner === true) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }
  form: FormGroup;
  checked: boolean;
  ngOnInit() {
    console.log('init');

  }
  // compareFn(d1: {value: boolean}, d2: {value: boolean}) {
  //   console.log(d1,"===",d2)
  //   // if (d1 === d2)
  //   //   return this.checked = true
  //   // else return this.checked = false
  //   return d1 === d2 ? this.checked = true : this.checked=false;
  // }

  save() {
    console.log('send to updateSErv', this.form);
    this.dialogRef.close(this.driverservice.updateDriver(this.form.value).subscribe(res => { console.log(this.form.value); return res; }));
    // this.dialogRef.close(this.societyService.updateSociety(this.data).subscribe());
    // console.log('save:'+this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
