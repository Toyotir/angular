import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatFormFieldControl} from "@angular/material";
import {FormBuilder, Validators,FormControl, FormGroup} from "@angular/forms";
import {SocietyService,Society} from "../society.service"
import { formatDate, DatePipe } from '@angular/common';
import {Driver,DriverService} from "../driver.service"
import { Observable, observable } from 'rxjs';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'deldriver-dialog',
  templateUrl: './deldriver-dialog.component.html',
  styleUrls: ['./deldriver-dialog.component.css']
})
export class DeldriverDialogComponent implements OnInit {
  id: string;
  last_name: string;
  first_name: '';
  constructor(private societyService:SocietyService,private driverservice:DriverService,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private dialogRef : MatDialogRef<DeldriverDialogComponent>) {
      this.id = data.id;
      this.last_name = data.last_name;
      this.first_name = this.data.first_name;
     }
  ngOnInit() {
  }

  confirmDel() {
    this.dialogRef.close(this.driverservice.deleteDriver(this.id).subscribe(res=>{return res}))
  }

  close() {
    this.dialogRef.close();
  }

}
