import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatFormFieldControl} from "@angular/material";
import {FormBuilder, Validators,FormControl, FormGroup,AbstractControl} from "@angular/forms";
import { formatDate, DatePipe } from '@angular/common';
import {Car,CarService} from "../car.service"
import { Observable, observable } from 'rxjs';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'editcar-dialog',
  templateUrl: './editcar-dialog.component.html',
  styleUrls: ['./editcar-dialog.component.css']
})
export class EditcarDialogComponent implements OnInit {
  id: '';
  brand: '';
  model: '';
  platenum: '';
  numTaxi: Number;
  validation_messages: any;

  constructor(private carService: CarService, @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder, private dialogRef: MatDialogRef<EditcarDialogComponent>) {
    this.id = data.id;
    this.brand = data.brand;
    this.model =  data.model;
    this.platenum = data.platenum;
    this.numTaxi = data.numTaxi;
    this.validation_messages = {
      'brand': [
          { type: 'required', message: 'brand is required.' },

        ],
        'model': [
          { type: 'required', message: 'model is required.' }
        ],
        'platenum': [
          { type: 'required', message: 'plate is required.' },
          { type: 'pattern', message: 'must be 1tx + 1 letter + 3 numbers.' }
          // { type: 'min',message:'!!'}
        ],
        'numTaxi': [
          { type: 'required', message: 'taxi number is required.' }
        ]
    };

  }
  form: FormGroup;
  checkplate(data: AbstractControl) {
    return (control: AbstractControl): {[key: string]: any} | null => {
      // const forbidden = data;
      let response: boolean;
      this.carService.checkplate(data).subscribe(res => {
        response = res;
      });
      return response ? {'forbiddenplate': {value: control.value}} : null;
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      id : this.id,
      brand :[this.brand,Validators.required],
      model:[this.model,Validators.required],
      platenum : [this.platenum,Validators.compose([Validators.required,
        Validators.pattern('[1][t][x][a-z][0-9]{3}')
        ]) ],
      numTaxi: [this.numTaxi,Validators.required]
    })
  }



  save() {
    console.log('send to updateSErv', this.form);
    this.dialogRef.close(this.carService.updateCar(this.form.value).subscribe(res => {
      console.log(this.form.value);
      return res;
    }));
    // this.dialogRef.close(this.societyService.updateSociety(this.data).subscribe());
    // console.log('save:'+this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
  onkeynumtaxi(value: string) {
    this.carService.checknumtaxi(value).subscribe(res => {
      console.log('onkeynumtaxi', res);
    });
  }

}
