import { Component, OnInit ,ElementRef,ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource,MatTable,MatSnackBar} from "@angular/material";
import {MatDialog, MatDialogConfig} from "@angular/material";
import { CarService,Car } from '../car.service';
import { AddcarDialogComponent } from '../addcar-dialog/addcar-dialog.component';
import { EditcarDialogComponent } from '../editcar-dialog/editcar-dialog.component';
import { DelcarDialogComponent } from '../delcar-dialog/delcar-dialog.component';
import { CarDataSource} from '../cardatasource'

@Component({
  selector: 'carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit {

  // dataSource = new CarDataSource(this.carService);
  // dataSource:MatTableDataSource<any>;
  dataSource = new MatTableDataSource();
  datarow: Car;
  displayedColumns = ['brand', 'model', 'platenum', 'numTaxi', 'option'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tablecar') tablecar: MatTable<any>;
  @ViewChild('input') input: ElementRef;
  constructor(private carService: CarService, private dialog: MatDialog,
    private cd: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.carService.getAll().subscribe(res => {
      // let array = res;
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // console.log(this.dataSource,"get",res)
    });
  }
  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public refresh() {
    this.carService.getAll().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.tablecar.renderRows();
  }

  public onRowClicked(row) {
    // console.log('Row clicked: ', row);
    this.datarow = row;
}

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "275px";

    // this.dialog.open(DriverDialogComponent,dialogConfig);
    const dialogRef = this.dialog.open(AddcarDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      // console.log('afterclose')
      this.refresh();
      return res;
    });
  }

  editCar(id: number, brand: string, model: string, platenum: string, numTaxi: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "275px";
    dialogConfig.data = {id: id, brand: brand, model: model, platenum: platenum, numTaxi: numTaxi};
    const dialogRef = this.dialog.open(EditcarDialogComponent, dialogConfig);
    // console.log("send to dialog",dialogConfig.data)
    dialogRef.afterClosed().subscribe(res => {
      this.refresh();
      return res;
    });
}
  delCar(id: number, platenum: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    dialogConfig.data = {id: id, platenum: platenum};
    const dialogRef = this.dialog.open(DelcarDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
      return res;
    });
  }




}
