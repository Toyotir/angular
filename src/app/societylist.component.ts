import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SocietyService, Society } from './society.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig, MatTable } from '@angular/material';
import { SocDataSource } from './socdatasource';
import { SocaddDialogComponent } from './socadd-dialog/socadd-dialog.component';
import { SoceditDialogComponent } from './socedit-dialog/socedit-dialog.component';
import { RoadDialogComponent } from './road-dialog/road-dialog.component';
import { Observable } from 'rxjs';
import { Driver, DriverService, User } from './driver.service';
import {Car, CarService} from './car.service';
import {AdminService} from './admin.service';
import { DelsocDialogComponent } from './delsoc-dialog/delsoc-dialog.component';


@Component({
    selector: 'societylist',
    templateUrl: 'societylist.component.html',
    styleUrls: ['societylist.component.css'],
})
export class SocietyListComponent implements OnInit {
    public societies: Society[];
    // ss:Society[]
    society: Society;
    // dataSource = new SocDataSource(this.societyService);
    dataSource = new MatTableDataSource;
    datas2 = SocietyService;
    datarow: Society;
    refreshdata: SocDataSource;
    displayedColumns = ['name', 'tva', 'option'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('tablesoc') tablesoc: MatTable<any>;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('tablesociety') tablesociety: MatTable<any>;
    @ViewChild('input') input: ElementRef;

    constructor(private societyService: SocietyService, private dialog: MatDialog, public adminS: AdminService) { }

    ngOnInit() {
        this.societyService.getAll().subscribe(res => {
            let array = res;
            this.dataSource = new MatTableDataSource(array);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;

        });

    }

   public refresh() {
        this.societyService.getAll().subscribe(res => {
            // this.societies = res, console.log(res);
          this.dataSource.data = res;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
        this.tablesociety.renderRows();
    }

    public onRowClicked(row) {
        console.log('Row clicked: ', row);
        this.datarow = row;
    }

    opencreatesoc() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '275px';
        const dialogRef = this.dialog.open(SocaddDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(res => {
          this.refresh();
          return res ;
        });

    }

    editSoc(id: number, name: string, tva: string, owners: User[],
      adress: string, addnum: number, locality: number, drivers:Driver[],cars:Car[]) {
        const dialogConfig = new MatDialogConfig();
        console.log("send to dialog before data", drivers)
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "275px";
        dialogConfig.data = { id: id, name: name, tva: tva, owners: [owners],
          adress: adress, addnum: addnum, locality: locality, drivers:[drivers],cars:[cars]}
        const dialogRef = this.dialog.open(SoceditDialogComponent, dialogConfig);
        console.log("send to dialog", dialogConfig.data)
        dialogRef.afterClosed().subscribe(res => {
          this.refresh();
          return res;
        });
    }
    delSoc(id: number, name: string) {
        // this.onRowClicked
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "275px";
        dialogConfig.data = {id: id, name: name}
        const dialogRef = this.dialog.open(DelsocDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(res => {
          // this.ngOnInit();
          this.refresh();
          return res ;
        });
        // this.societyService.deleteSociety(this.datarow).subscribe(res => {
        //   this.refresh();
        //   // this.ngOnInit();
        //   // this.societies.splice(this.societies.indexOf(this.datarow), 1)
        //   return res;
        // });
        // return this.societyService.deleteSociety(this.datarow).subscribe(res=>{
          // this.dataSource.loadingSubject;console.log('effacéééééé'+res)});


    }

    details(name: any, id: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '700px';
        dialogConfig.data = { name: name, id: id };
        const dialogRef = this.dialog.open(RoadDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(res => {
          // this.refresh();
          return res;
        });
    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }



}
