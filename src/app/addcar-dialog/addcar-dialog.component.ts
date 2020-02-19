import { Make, MakeRes, ModelRes, Model } from './../car.service';
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatFormFieldControl,MatDialog,MatSnackBar, MatDialogConfig} from "@angular/material";
import {FormBuilder, Validators,ValidatorFn,FormControl, FormGroup,AbstractControl} from "@angular/forms";
import {SocietyService,Society} from "../society.service"
import { formatDate, DatePipe } from '@angular/common';
import {Car,CarService} from "../car.service"
import { Observable, observable, timer, Subscription } from 'rxjs';
import { ArrayDataSource } from '@angular/cdk/collections';
import { catchError, startWith, map, debounceTime, delay } from 'rxjs/operators';
import { AdminService } from '../admin.service';

// import {ValidateTaxi} from '../validator'


@Component({
  selector: 'addcar-dialog',
  templateUrl: './addcar-dialog.component.html',
  // styleUrls: ['./addcar-dialog.component.css']
})
export class AddcarDialogComponent implements OnInit {
  errooo;
  form:FormGroup;
  // listtaxi:any=[]
  brahhh = 'false'
  public ctrlpl: FormControl;
  validation_messages: any;
  listMakes: any = [];
  listModels: any = [];
  filteredMakes: Observable<string[]>;
  filteredModels: Observable<string[]>;
  // list: string[] = ['azert','qsdf','qfffff']
  makesub: Subscription;
  constructor(private carService: CarService, private adminS: AdminService, private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddcarDialogComponent>,private dialog: MatDialog,private snackBar: MatSnackBar) {

      this.validation_messages = {
        'brand': [
            { type: 'required', message: 'brand is required.' },
          ],
          'model': [
            { type: 'required', message: 'model is required.' }
          ],
          'platenum': [
            { type: 'required', message: 'plate is required.' },
            { type: 'pattern', message: 'must be tx + 2 letters + 3 numbers.' }
            // { type: 'min',message:'!!'}
          ],
          'numTaxi': [
            { type: 'required', message: 'taxi number is required.' }
          ]
      };
    this.ctrlpl = this.fb.control('', [Validators.required, Validators.pattern('[t][x][a-z][a-z][0-9]{3}')], [this.checkplate()]);
  }

  ngOnInit() {
    this.form = this.fb.group({
      brand : ['' , Validators.required],
      model: ['' , Validators.required],
      platenum: this.ctrlpl,
      numTaxi: [Number, [Validators.required, Validators.min(0), Validators.max(9999)], [this.checknumtaxi()]],
    });
    this.getListMakes();
    // this.listMakes = this.form.get('brand').valueChanges.pipe(startWith(''),map((value =>this._filter(value))))
    
    
    console.log('filtered',this.filteredMakes)
    // this.getmodel()
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

  // validator custom avec timer et si t'ecris pas
  checkplate(): any {
    let timer;
    return (control: AbstractControl): {[key: string]: any} | null => {
      let response;
      return new Promise(res1 => {
        timer = setTimeout(() => {
          if (control.pristine) {
            return res1(null);
          } else {
            this.carService.checkplate(control.value).subscribe(res => {
              response = res;
              // console.log('nopif', control.value, response);
              return res1(res ? {'nop': {value: true}} : null);
            });
          }
        }, 300);
      });
    };
  }

  checknumtaxi(): any {
    let timer;
    return (control: AbstractControl): {[key: string]: any} | null => {
      let response;
      return new Promise(res1 => {
        timer = setTimeout(() => {
          if (control.pristine) {
            return res1(null);
          } else {
            this.carService.checknumtaxi(control.value).subscribe(res => {
              response = res;
              // console.log('nopif', control.value, response);
              return res1(res ? {'nop': {value: true}} : null);
            });
          }
        }, 300);
      });
    };
  }

  getListMakes(){
    this.carService.getAllMakes().subscribe(res => {
      this.listMakes = res.Results;
      this.filteredMakes = this.form.controls.brand.valueChanges.pipe(startWith(""),map((value =>this._filter(value))));
      console.log('list',this.listMakes);
    });
  }
  getModel(make_name) {
    this.carService.getModel(make_name).subscribe(res => {
      console.log('model',make_name,res)
      this.listModels = res.Results;
      // on met le change value du filter ici car sinon la list est vide dans le nginit et n'affiche pas la liste dans l'autocomplete  
      this.filteredModels = this.form.controls.model.valueChanges.pipe(startWith(""),map((value =>this._filter2(value))));
      console.log('model',this.listModels);
    });
  }
  erorxx(){
    return this.form.hasError('validate') ? '' : 'You must enter a value';
  }

  errorBrand(){
    return this.form.hasError('required') ? '' : 'You must enter a value';
  }
  errormodel(){
    return this.form.hasError('required') ? '' : 'You must enter a value';
  }
  errortaxi(){
    return this.form.hasError('required') ?  '':'You must enter value' ;

  }

  errorplate2(){
    return this.form.hasError('pattern') ? '':'1tx + 1 letter + 3 numbers';
  }
  errorplate(){
    return this.form.hasError('required') ? '':'You must enter a value';
  }

  alerterror(err:[string]){
    let array = err
    array.forEach(element => {
      if (element != null)
      return element
    });
  }
  save(){
    // if (this.carService.createCar(this.form.value).subscribe(res=>{return true}))
    //   this.dialogRef.close()
    // else if(this.carService.createCar(this.form.value).subscribe(err=>{return err}))
    // {
    //   return false
    // }
    // this.dialogRef.close(this.carService.createCar(this.form.value));

    this.dialogRef.close(this.carService.createCar(this.form.value).subscribe(()=>{
      console.log('close')
      this.snackBar.open('succes','undo', {
        duration: 2000,
      });
    },
      err=>{
        this.errooo = err,alert(err);
      // this.dialogRef
      }
    ));
    // this.dialogRef.afterClosed().subscribe(()=>{
    //   this.snackBar.open('succes','undo', {
    //     duration: 2000,
    //   });
    // })
    // console.log('save:',this.carService.eroorhandle.error_messages);
  }
  close(){
    this.dialogRef.close();
  }

}
