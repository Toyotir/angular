import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,MatFormFieldControl} from "@angular/material";
import {FormBuilder, Validators, AbstractControl, FormControl, FormGroup, FormGroupName} from "@angular/forms";
import {Driver,DriverService} from "../driver.service"
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'driver-dialog',
  templateUrl: './driver-dialog.component.html',
  // styleUrls: ['./driver-dialog.component.css']
})
export class DriverDialogComponent implements OnInit {
  form: FormGroup;
  checked = false;
  checked2 = false;
  // subform:FormGroupName
  oneYear = 31556952000;
  minage = 31556952000 * 21;
  age21 = new Date(new Date().getTime() - this.minage);
  minFromDate = new Date((new Date().getTime() + this.oneYear));
  validation_messages: any;
  constructor(private driverService: DriverService, private fb: FormBuilder, private dialogRef: MatDialogRef<DriverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any, private datepipe: DatePipe) {
      this.form = this.fb.group({
        last_name : ['', Validators.required],
        first_name: ['', Validators.required],
        username: ['', Validators.required, [this.checkusername()]],
        password: ['', [Validators.required, Validators.pattern('.{7,}[A-Za-z0-9]+')]],
        is_staff: Boolean,
        driver: this.fb.group({
          birthdate: [this.datepipe.transform(new Date(this.age21), 'yyyy-MM-dd'), Validators.required],
          owner: [Boolean],
          adress: ['', Validators.required],
          addnum: [Number, [Validators.required, Validators.min(1)]],
          locality: [Number, [Validators.required, Validators.min(1)]],
          licenseExp: [this.datepipe.transform(new Date(this.minFromDate), 'yyyy-MM-dd'), Validators.required]
        })
      });
    }

  ngOnInit() {
    this.validation_messages = {
      'last_name': [
          { type: 'required', message: 'lastname is required.' },
        ],
        'first_name': [
          { type: 'required', message: 'firstname is required.' }
        ],
        'username': [
          { type: 'required', message: 'username is required.' }
        ],
        'password': [
          { type: 'required', message: 'password  is required.' },
          { type: 'pattern', message: 'must contains letter and number' }
        ],
        'birthdate': [
          { type: 'required', message: 'birthdate  is required.' }
        ],
        'adress': [
          { type: 'required', message: 'adress is required.' }
        ],
        'addnum': [
          { type: 'required', message: 'addnum is required.' }
        ],
        'locality': [
          { type: 'required', message: 'locality is required.' }
        ],
        'licenseExp': [
          { type: 'required', message: 'licenseExp is required.' }
        ],
    };
  }

  checkusername(): any {
    let timer;
    return (control: AbstractControl): {[key: string]: any} | null => {
      let response;
      return new Promise(res1 => {
        timer = setTimeout(() => {
          if (control.pristine) {
            return res1(null);
          } else {
            this.driverService.checkusername(control.value).subscribe(res => {
              response = res;
              // console.log('nopif', control.value, response);
              return res1(res ? {'nop': {value: true}} : null);
            });
          }
        }, 300);
      });
    };
  }
  checkbirth(): any {
    let timer;
    return (control: AbstractControl): {[key: string]: any} | null => {
      // let response;
      return new Promise(res1 => {
        timer = setTimeout(() => {
          if (control.pristine) {
            return res1(null);
          } else {
            const time = new Date().getTime() - control.value;
            const age = time / (1000 * 360 * 24);
            return res1(age >= 21 ? {'nop': {value: true}} : null);
          }
        }, 300);
      });
    };
  }
  checklic(): any {
    let timer;
    return (control: AbstractControl): {[key: string]: any} | null => {
      // let response;
      return new Promise(res1 => {
        timer = setTimeout(() => {
          if (control.pristine) {
            return res1(null);
          } else {
            const time = control.value - new Date().getTime() ;
            const age = time / (1000 * 360 * 24);
            return res1(age > 1 ? {'nop': {value: true}} : null);
          }
        }, 300);
      });
    };
  }


  save() {
    this.dialogRef.close(this.driverService.createDriver(this.form.value).subscribe());
    console.log('save:' + this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
