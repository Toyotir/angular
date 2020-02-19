import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatFormFieldControl} from "@angular/material";
import {FormBuilder, Validators,FormControl, FormGroup,AbstractControl} from "@angular/forms";
import { formatDate, DatePipe } from '@angular/common';
import {Car,CarService,Make} from "../car.service"
import { Observable, observable } from 'rxjs';
import { ArrayDataSource } from '@angular/cdk/collections';
import { catchError, startWith, map, debounceTime, delay } from 'rxjs/operators';
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
  listMakes: any = [];
  listModels: any = [];
  filteredMakes: Observable<string[]>;
  filteredModels: Observable<string[]>;
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
          { type: 'pattern', message: 'must be tx + 2 letter + 3 numbers.' }
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
        Validators.pattern('[t][x][a-z][a-z][0-9]{3}')
        ]) ],
      numTaxi: [this.numTaxi,Validators.required]
    });
    this.getListMakes();
    // this.listModels = this.form.get('model').valueChanges.pipe(startWith(''),map((value =>this._filter(value))));
  }
  public _filter(value:string):string[] {
    const filterValue = value.toLowerCase();
    console.log('filter',filterValue)
    return this.listMakes.filter(option => option.MakeName.toLowerCase().includes(filterValue));
  }
  public _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log('filter',filterValue)
    return this.listModels.filter(option => option.Model_Name.toLowerCase().includes(filterValue));
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

  getModel(make_name) {
    this.carService.getModel(make_name).subscribe(res => {
      this.listModels = res;
      this.filteredModels = this.form.controls.model.valueChanges.pipe(startWith(""),map((value =>this._filter2(value))));
      console.log('model',this.listModels);
    });
  }
  getListMakes(){
    this.carService.getAllMakes().subscribe(res => {
      this.listMakes = res.Results;
      console.log('list',this.listMakes);
      this.filteredMakes = this.form.controls.brand.valueChanges.pipe(startWith(''),map((value =>this._filter(value))))
    });
  }

}
