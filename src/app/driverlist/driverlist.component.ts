import { MatTable } from '@angular/material';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { DriverService, Driver, User } from '../driver.service';
import { DriverDialogComponent } from '../driver-dialog/driver-dialog.component';
import { DeldriverDialogComponent } from '../deldriver-dialog/deldriver-dialog.component';
import { EditdriverDialogComponent} from '../editdriver-dialog/editdriver-dialog.component';
import { DriverDataSource} from '../driverdatasource';
import { AdminService } from '../admin.service';

// import { Http, RequestOptions  } from "@angular/http";
@Component({
  selector: 'driverlist',
  templateUrl: './driverlist.component.html',
  styleUrls: ['./driverlist.component.css']
})
export class DriverlistComponent implements OnInit {
  public drivers: User[];
  public driver: Driver;
  exampleDatabase: DriverService;
  // dataSource = new DriverDataSource(this.driverService);
  dataSource = new MatTableDataSource();
  datarow: Driver;
  array: any = [];
  driverarray = Array<User>();
  array2 = Array<User>();
  displayedColumns = ['last_name', 'first_name', 'driver.birthdate', 'driver.adress', 'driver.locality', 'option'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('tableuser') tableuser: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  constructor( private driverService: DriverService, private dialog: MatDialog, private adminS: AdminService) {
  }
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      console.log('nested')
      return property.split('.')
        .reduce((object, key) => object[key], item);
    } else {
      console.log('not nested')
      return item[property];
    }
  }

  ngOnInit() {
    this.driverService.getAll().subscribe(res => {
      this.driverarray  = res;
      this.array2 = res;
      // this.array = res;
      let arraytemp = this.array2.filter(function(value) {
        return value.is_staff === false && value.driver != null;
      });
      console.log('final', this.array, arraytemp);
      this.dataSource = new MatTableDataSource(arraytemp);
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }


  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.birthdate.toLowerCase().indexOf(searchTerms.birthdate) !== -1
        && data.adress.toString().toLowerCase().indexOf(searchTerms.adress) !== -1
        && data.locality.toLowerCase().indexOf(searchTerms.locality) !== -1;
        // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    };
    return filterFunction;
  }
  applyFilter(filterValue: any) {
    console.log('search', filterValue, this.driverarray, this.array2);
    this.driverarray = this.array2.filter((res) => {
      return (JSON.stringify(res).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) && res.is_staff === false && res.driver != null;
    });
    console.log('filterarray', this.driverarray);
    this.dataSource = new MatTableDataSource(this.driverarray);
    // console.log(this.dataSource.data.filter(filterValue.trim().toLowerCase()))

  }

  public onRowClicked(row) {
    // console.log('Row clicked: ', row);
    this.datarow = row
}


  public refreshTokenTest() {
    this.adminS.refreshToken().subscribe(res=>{console.log('ok');return res})
    console.log('click')
  }
  refresh() {
    console.log('refreshdata');
    // return this.dataSource;
    this.driverService.getAll().subscribe(res => {
      this.driverarray  = res;
      this.array2 = res;
      // this.array = res;
      let arraytemp = this.array2.filter(function(value) {
        return value.is_staff === false && value.driver != null;
      });
      console.log('final', this.array, arraytemp);
      this.dataSource.data = arraytemp;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.tableuser.renderRows();

  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '275px';

    // this.dialog.open(DriverDialogComponent,dialogConfig);
    const dialogRef = this.dialog.open(DriverDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {this.refresh(); return data;});
  }

  editDriver(id:number,last_name:string,first_name:string,username:string,password:string,is_staff:boolean,
    birthdate:Date,owner:boolean,adress:string,addnum:number,locality:number,licenseExp:Date){
    console.log('getparams', id, password,birthdate)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "275px";
    dialogConfig.data = {id:id,last_name:last_name,first_name:first_name,username:username,password:password,is_staff:is_staff,
      birthdate:birthdate,owner:owner,adress:adress,addnum:addnum,locality:locality,licenseExp:licenseExp}
    const dialogRef = this.dialog.open(EditdriverDialogComponent,dialogConfig);
    console.log('send to dialog', dialogConfig.data);
    dialogRef.afterClosed().subscribe(res => {
      this.refresh();
      return res;
    });
}
  delDriver(id: number, last_name: string, first_name: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '275px';
    dialogConfig.data = {id: id, last_name: last_name, first_name: first_name};
    const dialogRef = this.dialog.open(DeldriverDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {this.refresh(); return res; });
  }


}
