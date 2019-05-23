import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatFormFieldControl} from "@angular/material";
// import {FormBuilder, Validators,FormControl, FormGroup} from "@angular/forms";
// import {SocietyService,Society} from "../society.service"
// import { formatDate, DatePipe } from '@angular/common';
import {Car,CarService} from "../car.service"
// import { Observable, observable } from 'rxjs';
// import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'delcar-dialog',
  templateUrl: './delcar-dialog.component.html',
  styleUrls: ['./delcar-dialog.component.css']
})
export class DelcarDialogComponent implements OnInit {

  id: string;
  platenum: string;
  constructor(private carService: CarService, @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<DelcarDialogComponent>) {
    this.id = data.id;
    // this.platenum = data.platenum
  }

  ngOnInit() {
  }
  confirmDel() {
    this.dialogRef.close(this.carService.deleteCar(this.id).subscribe(res => {
      return res;
    }));
  }
  close() {
    this.dialogRef.close();
  }

}
