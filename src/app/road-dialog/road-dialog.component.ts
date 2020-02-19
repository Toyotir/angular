import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef, MatFormFieldControl, MatDialog,
  MatDialogConfig, MatTableDataSource, MatPaginator, MatSort, MatBottomSheet,
   MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA,MatTooltip
} from "@angular/material";
import { FormBuilder, Validators, FormControl, FormGroup } from "@angular/forms";
import { SocietyService, Society } from "../society.service"
import { formatDate, DatePipe } from '@angular/common';
import { Car, CarService } from "../car.service"
import { MapsheetComponent } from '../mapsheet/mapsheet.component';
import { Observable, observable } from 'rxjs';
import { ArrayDataSource } from '@angular/cdk/collections';
import { catchError } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-road-dialog',
  templateUrl: './road-dialog.component.html',
  styleUrls: ['./road-dialog.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RoadDialogComponent implements OnInit {
  name: '';
  id;
  displayedColumns = ['sheetnum', 'date', 'totprice'];
  displayedColumnstwo = ['numride', 'boarding', 'timeB', 'landing', 'timeL', 'price'];
  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  isExpansionDetailRow = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedRide: any;
  @ViewChild(MatSort) sort: MatSort;
  roadlist;
  array;
  constructor(private roaddialog: MatDialogRef<RoadDialogComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private societyService: SocietyService, private bottomSheet: MatBottomSheet) {
    this.name = data.name;
      this.id = data.id;
  }

  ngOnInit() {
    this.societyService.getroadbysoc(this.id).subscribe(res => {
      this.array = res;
      this.dataSource = new MatTableDataSource(res);
      // si jamais il faut mettre les ride en id =>
      // - get id rs quand on click
      // - get tout les ride === rs id
      // this.dataSource2 = new MatTableDataSource(array.rides);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }
  getTotalCost() {
    return this.array.map(r => r.rides.price).reduce((acc, value) => acc + value, 0);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // openBottomMap(id): void {
  //   // console.log('to bottom', id);
  //   this.bottomSheet.open(MapsheetComponent, { data: { id: id } }).afterOpened().subscribe(()=>console.log('botom'));

  // }
  openBottomMap(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    console.log('ride',id)
    dialogConfig.data = { id: id };
    const dialogRef = this.dialog.open(MapsheetComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      return res;
    });

  }

  // public getRideByNum(row) {
  //   this.isExpansionDetailRow = true;
  //   this.societyService.getRides().subscribe(res => {
  //     let array = res;
  //     let array2: any = [];
  //     array.forEach(element => {
  //       if (row.id === element.roadsheet) {
  //         array2.push(element);
  //       }
  //     });
  //     this.dataSource2 = new MatTableDataSource(array2)

  //     // this.dataSource2.sort = this.sort
  //     // this.dataSource2.paginator = this.paginator
  //   })
  // }

}

// declare const google: any;
// var drawingManager;
// var placeIdArray = [];
// var polylines: any = [{}];
// var snappedCoordinates = [];

// @Component({
//   selector: 'app-bottom-map',
//   templateUrl: 'bottom-map.html',
// })

// export class BottomMap {
//   id=5;
//   ride: Number;
//   depart: string;
//   arrived: string;
//   cost: Number;
//   r: any = [];
//   latA: number ;
//   lngA: number ;
//   latB: number ;
//   lngB: number ;
//   toLatLngArray: Array<{ lat: number, lng: number }> = [];
//   zoom: number = 11;
//   constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private societyService: SocietyService,
//     private bottomSheetRef: MatBottomSheetRef<BottomMap>) {
//     console.log('idride', data.id);
//     this.societyService.getRide(data.id).subscribe(res => {
//       console.log(res)
//       this.ride = res.idr;
//       this.depart = res.boarding;
//       this.arrived = res.boarding;
//       this.cost = res.price;
//       polylines = res.path;
//       console.log('voila', this.ride, this.depart, polylines);
//       // this.gpsToLatLng();
//       // this.loadMap()
//     })

//   }
//   openLink(event: MouseEvent): void {
//     this.bottomSheetRef.dismiss();
//     event.preventDefault();
//   }
//   // ngOnInit() {
//   //   // console.log('map path =',this.id)
//   //   // await this.getRide(this.id)
//   //   // await this.loadMap()
//   // }

//   // getRide(id) {
//   //   // console.log('get', id);
//   //   this.societyService.getRide(id).subscribe(res => {
//   //     // this.r = res;
//   //     // console.log('voila', res);
//   //     this.ride = res.idr;
//   //     this.depart = res.boarding;
//   //     this.arrived = res.boarding;
//   //     this.cost = res.price;
//   //     polylines = res.path;
//   //     console.log('voila', this.ride, this.depart, polylines);
//   //     // this.gpsToLatLng();
//   //     // this.loadMap()
//   //   });
//   // }
//   gpsToLatLng() {
//     polylines.forEach(element => {
//       console.log('testelem', element[0], element[1], this.toLatLngArray)
//       // toLatLngArray['lat'] = element[0]
//       // toLatLngArray['lng'] = element[1]
//       this.toLatLngArray.push({ lat: parseFloat(element[0]), lng: parseFloat(element[1]) });
//       console.log('latlng', this.toLatLngArray)
//     });
//     this.latA = this.toLatLngArray[0].lat
//     this.lngA = this.toLatLngArray[0].lng
//     this.latB = this.toLatLngArray[this.toLatLngArray.length-1].lat
//     this.lngB = this.toLatLngArray[this.toLatLngArray.length-1].lng
//   }




//   loadMap() {
//     let map;
//     console.log('poly', polylines)
//     let marker;
//     const DALLAS = { lat: 32.7767, lng: -96.7970 };

//     map = new google.maps.Map(document.getElementById('map'), {
//       // camera:{target:this.toLatLngArray} ,
//       center: DALLAS,
//       zoom: 3
//     });

//     marker = new google.maps.Marker({
//       position: DALLAS,
//       map: map,
//       title: 'Hello World!'
//     });
//     var flightPlanCoordinates = [
//       { lat: 50.7483984, lng: 4.2733992 },
//       { lat: 50.7483984, lng: 4.2733992 }
//     ];
//     var toLatLngArray: Array<{ lat: number, lng: number }> = [];
//     // function gpsToLatLng() {
//       polylines.forEach(element => {
//         console.log('testelem', element[0], element[1], toLatLngArray)
//         // toLatLngArray['lat'] = element[0]
//         // toLatLngArray['lng'] = element[1]
//         toLatLngArray.push({ lat: parseFloat(element[0]), lng: parseFloat(element[1]) });
//         console.log('latlng', toLatLngArray)
//       });
//     // }
//     // gpsToLatLng();

//     // drawingManager = new google.maps.drawing.DrawingManager({
//     //   drawingMode: google.maps.drawing.OverlayType.POLYLINE,
//     //   drawingControl: true,
//     //   drawingControlOptions: {
//     //     position: google.maps.ControlPosition.TOP_CENTER,
//     //     drawingModes: [
//     //       google.maps.drawing.OverlayType.POLYLINE
//     //     ]
//     //   },
//     //   polylineOptions: {
//     //     strokeColor: '#696969',
//     //     strokeWeight: 2
//     //   }
//     // });
//     // drawingManager.setMap(map);
//     var drawPath = new google.maps.Polyline({
//       path: toLatLngArray,
//       geodesic: true,
//       strokeColor: '#FF0000',
//       strokeOpacity: 1.0,
//       strokeWeight: 2
//     });
//     console.log('draw', toLatLngArray, flightPlanCoordinates)

//     drawPath.setMap(map);
//     // drawingManager.addListener('polylinecomplete', function(poly) {
//     //   var path = poly.getPath();
//     //   polylines.push(this.toLatLngArray);
//     //   placeIdArray = [];
//     //   // runSnapToRoad(path);
//     // });

//   }


// }



