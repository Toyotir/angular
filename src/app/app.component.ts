import { Component } from '@angular/core';
import {AdminService } from './admin.service'
import {MAT_DATE_FORMATS} from '@angular/material';

export const DD_MM_YYYY_Format = {
  parse: {
      dateInput: 'LL',
  },
  display: {
      dateInput: 'YYYY/MM/DD',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
]
})
export class AppComponent {
  constructor(private adminS:AdminService){}
  title = 'Taxi Manager';
}
