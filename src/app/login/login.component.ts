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
    // setTimeout(() => {
      this.adminS.login(this.form.value).subscribe(()=>{
        if(this.adminS.isAdmin){
          console.log('yolo');
          this.adminS.tokenStartTimer(this.adminS.tokenStorage.token)
          this.form.reset();
          console.log('isadminlogin',this.adminS.isAdmin)
          const returnUrl = this.adminS.redirectUrl || '/soc';
          this.adminS.redirectUrl = null;
          this.router.navigate([returnUrl]);
          // if(returnUrl == '/soc'){
          //   this.snackbar.open('succes','undo', {
          //     duration: 2000,
          //   });
          // }

        }
        // else if(!this.adminS.isAdmin) {
        //   console.log('pasyolo');
        //   this.router.navigate(['/invalid'])
        // } else {
        //   console.log('nullyolo');
        //   this.router.navigate(['/login'])
        // }
      }, err => {
        this.snackbar.open('failed','undo', {
          duration: 2000,
        });
      });
    // }, 1000);

  }

}
