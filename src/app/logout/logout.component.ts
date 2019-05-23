import { Component, OnInit } from '@angular/core';
import {Router}from "@angular/router"
import {AdminService} from '../admin.service'
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent{

  constructor(private router:Router,private adminS:AdminService) {
    this.adminS.logout();
    this.router.navigate(['/login'])
   }

}
