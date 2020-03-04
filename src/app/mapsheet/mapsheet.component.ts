import { Component, OnInit, Inject, ViewChild,AfterViewInit,OnDestroy } from '@angular/core';
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
declare var H: any;
var drawingManager;
var placeIdArray = [];
var polylines: any = [{}];
var snappedCoordinates = [];

@Component({
  selector: 'app-mapsheet',
  templateUrl: './mapsheet.component.html',
  styleUrls: ['./mapsheet.component.css']
})
export class MapsheetComponent implements OnInit, AfterViewInit, OnDestroy {
  private hereplatform: any;
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
  polymeters;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private societyService: SocietyService,
  private mapsheet: MatDialogRef<MapsheetComponent>) {
    console.log('idrideconstrucotr', data.id);
    this.hereplatform = new H.service.Platform({
      'app_id': '5c3v9AV3GQWWOSVrRRhe',
      'app_code': 'Q93ny6JKm00x8YE27O9UNA',
      'useHTTPS': true
    });
    this.societyService.getRide(data.id).subscribe(res => {
      console.log(res)
      this.ride = res[0].idr;
      this.depart = res[0].boarding;
      this.arrived = res[0].boarding;
      this.cost = res[0].price;
      polylines = res[0].path;
      console.log('voila',res, this.ride, this.depart, polylines);
      // this.gpsToLatLng();
      // this.loadMap()
    });
   }

  ngOnInit() {
    console.log('ngOnInit')
    // this.inithere();
  }
  // openLink(event: MouseEvent): void {
  //   this.bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }
    // here map api
    ngAfterViewInit(){
      console.log('afeter')
      setTimeout(() => {
        this.inithere()
      }, 750);

    }
    ngOnDestroy() {
      console.log("ngOnDestroy");
      this.inithere();
    }
    inithere(){
      const defaultLayers = this.hereplatform.createDefaultLayers();
      var linestring = new H.geo.LineString();
      const map = new H.Map(
        document.getElementById('map2'),
        defaultLayers.normal.map,
        {
          zoom: 10,
          center: { lat: 52.5, lng: 13.4 }
        }
      );
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      const ui = H.ui.UI.createDefault(map, defaultLayers);
      var toLatLngArray: Array<{ lat: number, lng: number }> = [];
      const pointA = polylines[0]
      const pointB = polylines[polylines.length-1]
      const latlng = {lat: pointA[0], lng: pointA[1]};
      const latlng2 = {lat: pointB[0], lng: pointB[1]};
      // function gpsToLatLng() {
        polylines.forEach(element => {
          // console.log('testelem', element[0], element[1], toLatLngArray)
          // toLatLngArray['lat'] = element[0]
          // toLatLngArray['lng'] = element[1]
          // toLatLngArray.push({ lat: parseFloat(element[0]), lng: parseFloat(element[1]) });
          // console.log('latlng', toLatLngArray)
          linestring.pushPoint({lat:parseFloat(element[0]), lng:parseFloat(element[1])});
        });
        // polylines.forEach(function(point) {
        //   var parts = point.split(',');
        //   linestring.pushLatLngAlt(parts[0], parts[1]);
        // });

      console.log('latlng', latlng,latlng2)
      // linestring.pushPoint(polylines);
      var routline = new H.map.Polyline(
        linestring, { style: { strokeColor: 'red', lineWidth: 4 },arrows: { fillColor: 'blue', frequency: 3, width: 3, length: 3 }}
      )
      // Create the parameters for the reverse geocoding request:
      var reverseGeocodingParameters = {
        prox: latlng.lat+','+latlng.lng,
        mode: 'retrieveAddresses',
        maxresults: 1
      };
      var reverseGeocodingParameters2 = {
        prox: latlng2.lat+','+latlng2.lng,
        mode: 'retrieveAddresses',
        maxresults: 1
      };
      function onSuccess2(result) {
        var location = result.Response.View[0].Result[0];
        // getPolylineLength(linestring)
        // Create an InfoBubble at the returned location with
        // the address as its contents:
        ui.addBubble(new H.ui.InfoBubble({
            lat: location.Location.DisplayPosition.Latitude,
            lng: location.Location.DisplayPosition.Longitude
           }, { content:'Stop: '+ location.Location.Address.Label }));
      };
      function onSuccess(result) {
        var location = result.Response.View[0].Result[0];
      
        // Create an InfoBubble at the returned location with
        // the address as its contents:
        ui.addBubble(new H.ui.InfoBubble({
            lat: location.Location.DisplayPosition.Latitude,
            lng: location.Location.DisplayPosition.Longitude
           }, { content: 'Start: '+location.Location.Address.Label }));
      };
      var geocoder = this.hereplatform.getGeocodingService();
      geocoder.reverseGeocode(
        reverseGeocodingParameters,
        onSuccess,
        function(e) { alert(e); });
            geocoder.reverseGeocode(
        reverseGeocodingParameters2,
        onSuccess2,
        function(e) { alert(e); });

      var startMarker = new H.map.Marker({
        lat: latlng.lat,
        lng: latlng.lng,
      });
      // var bubble  =  new H.ui.InfoBubble({
      //   lat: latlng.lat,
      //   lng: latlng.lng,
      // }, {content : 'Start'});
      // ui.addBubble(bubble);

      // Create a marker for the end point:
      var endMarker = new H.map.Marker({
        lat: latlng2.lat,
        lng: latlng2.lng,
      });
      // var bubble2  =  new H.ui.InfoBubble({
      //   lat: latlng2.lat,
      //   lng: latlng2.lng,
      // }, {content : 'Stop'});
      // ui.addBubble(bubble2);
      map.addObjects([routline,startMarker, endMarker]);
      map.setViewBounds(routline.getBounds());

      // getPolylineLength()
      function getPolylineLength() {
        const geometry = linestring.getGeometry();
        let distance = 0;
        let last = geometry.extractPoint(0);
        for (let i=1; i < geometry.getPointCount(); i++) {
          const point = geometry.extractPoint(i);
          distance += last.distance(point);
          last = point;
        }
        if (linestring.isClosed()) {
          distance += last.distance(geometry.extractPoint(0));
        }

        // distance in meters
        return distance;
      }

    }
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
    var drawPath = new google.maps.Polyline({
      path: this.toLatLngArray,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    console.log('draw', this.toLatLngArray)
    var km = google.maps.geometry.spherical.computeLength(drawPath.getPath());
    this.polymeters = (km / 1000).toFixed(2);
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
