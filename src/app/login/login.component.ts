import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service'
import {FormBuilder, Validators,ValidatorFn,FormControl, FormGroup,AbstractControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  hide = true;
  constructor(private adminS:AdminService,private fb: FormBuilder,private snackbar: MatSnackBar,private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      username:'',
      password:''
    })
  }

  login(){
    this.adminS.login(this.form.value).subscribe(()=>{
      if(this.adminS.isAdmin){
        console.log('yolo');
        this.adminS.tokenStartTimer(this.adminS.tokenStorage.token)
        this.form.reset()
        let returnUrl = this.adminS.redirectUrl || '/soc';
        this.adminS.redirectUrl = null
        this.router.navigate([returnUrl]);

      }
    },err => {
      this.snackbar.open('Error connection','undo', {
        duration: 5000,
      });
    })
  }

}
