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
import { Observable, observable } from 'rxjs';
import { ArrayDataSource } from '@angular/cdk/collections';
import { catchError } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

declare const google: any;
var drawingManager;
var placeIdArray = [];
var polylines: any = [{}];
var snappedCoordinates = [];

@Component({
  selector: 'app-mapsheet',
  templateUrl: './mapsheet.component.html',
  styleUrls: ['./mapsheet.component.css']
})
export class MapsheetComponent implements OnInit {
  id=5;
  ride: Number;
  depart: string;
  arrived: string;
  cost: Number;
  r: any = [];
  latA: number ;
  lngA: number ;
  latB: number ;
  lngB: number ;
  toLatLngArray: Array<{ lat: number, lng: number }> = [];
  zoom: number = 11;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private societyService: SocietyService,
  private mapsheet: MatDialogRef<MapsheetComponent>) {
    console.log('idride', data.id);
    this.societyService.getRide(data.id).subscribe(res => {
      console.log(res)
      this.ride = res.idr;
      this.depart = res.boarding;
      this.arrived = res.boarding;
      this.cost = res.price;
      polylines = res.path;
      console.log('voila', this.ride, this.depart, polylines);
      this.gpsToLatLng();
      // this.loadMap()
    });
   }

  ngOnInit() {
  }
  // openLink(event: MouseEvent): void {
  //   this.bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }
  gpsToLatLng() {
    polylines.forEach(element => {
      console.log('testelem', element[0], element[1], this.toLatLngArray)
      // toLatLngArray['lat'] = element[0]
      // toLatLngArray['lng'] = element[1]
      this.toLatLngArray.push({ lat: parseFloat(element[0]), lng: parseFloat(element[1]) });
      console.log('latlng', this.toLatLngArray)
    });
    this.latA = this.toLatLngArray[0].lat;
    this.lngA = this.toLatLngArray[0].lng;
    this.latB = this.toLatLngArray[this.toLatLngArray.length - 1].lat;
    this.lngB = this.toLatLngArray[this.toLatLngArray.length - 1].lng;
  }
  // loadMap() {
  //   let map;
  //   console.log('poly', polylines)
  //   let marker;
  //   const DALLAS = { lat: 32.7767, lng: -96.7970 };

  //   map = new google.maps.Map(document.getElementById('map'), {
  //     // camera:{target:this.toLatLngArray} ,
  //     center: DALLAS,
  //     zoom: 3
  //   });

  //   marker = new google.maps.Marker({
  //     position: DALLAS,
  //     map: map,
  //     title: 'Hello World!'
  //   });
  //   var flightPlanCoordinates = [
  //     { lat: 50.7483984, lng: 4.2733992 },
  //     { lat: 50.7483984, lng: 4.2733992 }
  //   ];
  //   var toLatLngArray: Array<{ lat: number, lng: number }> = [];
  //   // function gpsToLatLng() {
  //     polylines.forEach(element => {
  //       console.log('testelem', element[0], element[1], toLatLngArray)
  //       // toLatLngArray['lat'] = element[0]
  //       // toLatLngArray['lng'] = element[1]
  //       toLatLngArray.push({ lat: parseFloat(element[0]), lng: parseFloat(element[1]) });
  //       console.log('latlng', toLatLngArray)
  //     });
  //   // }
  //   // gpsToLatLng();

  //   // drawingManager = new google.maps.drawing.DrawingManager({
  //   //   drawingMode: google.maps.drawing.OverlayType.POLYLINE,
  //   //   drawingControl: true,
  //   //   drawingControlOptions: {
  //   //     position: google.maps.ControlPosition.TOP_CENTER,
  //   //     drawingModes: [
  //   //       google.maps.drawing.OverlayType.POLYLINE
  //   //     ]
  //   //   },
  //   //   polylineOptions: {
  //   //     strokeColor: '#696969',
  //   //     strokeWeight: 2
  //   //   }
  //   // });
  //   // drawingManager.setMap(map);
  //   var drawPath = new google.maps.Polyline({
  //     path: toLatLngArray,
  //     geodesic: true,
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 1.0,
  //     strokeWeight: 2
  //   });
  //   console.log('draw', toLatLngArray, flightPlanCoordinates)

  //   drawPath.setMap(map);
  //   // drawingManager.addListener('polylinecomplete', function(poly) {
  //   //   var path = poly.getPath();
  //   //   polylines.push(this.toLatLngArray);
  //   //   placeIdArray = [];
  //   //   // runSnapToRoad(path);
  //   // });

  // }

}
