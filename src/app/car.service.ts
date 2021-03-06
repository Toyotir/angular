import { Injectable } from '@angular/core';
import { Observable, throwError, observable } from 'rxjs';
import { Http, RequestOptions } from "@angular/http";
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from './admin.service'
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { parse } from 'querystring';



export class Car {
  id: string;
  brand: string;
  model: string;
  platenum: string;
  numTaxi: number
  society: string

  constructor(data) {
    this.id = data.id;
    this.brand = data.brand;
    this.model = data.model;
    this.platenum = data.platenum;
    this.numTaxi = data.numTaxi;
    this.society = data.society;
  }
}
export class MakeRes {
  MakeID: number;
  MakeName: string;
  constructor(data) {
    this.MakeID = data.MakeID;
    this.MakeName = data.MakeName;
  }
}
export class Make {
  count: number;
  message: string;
  searchCriteria: any;
  Results: MakeRes[];
  constructor(data) {
    this.count = data.count;
    this.message = data.message;
    this.searchCriteria = data.searchCriteria;
    this.Results = data.Results;
  }
}
export class ModelRes {
  Model_Name: string;
}
export class Model {
  Results: ModelRes[];
}

export class ErrorCar {
  platenum: string;
  numTaxi: string;
  constructor(data) {
    this.platenum = data.platenum;
    this.numTaxi = data.numTaxi;
  }
}

// const URL = 'http://localhost:8000';
// const URL  = 'http://192.168.1.11:8000';
const URL = 'https://taxidrf.herokuapp.com';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  carfilter: any =[]
  eroorhandle
  constructor(private http: Http, private adminS: AdminService, private httpC: HttpClient) {

  }

  public getAll(): Observable<Array<Car>> {
    return this.httpC.get<Array<Car>>(`${URL}/api/cars`, {
      headers: {
        ['Content-Type']: 'application/json',
        ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
      }
    }
    )
  }

  public checkplate(data): Observable<boolean> {
    return this.httpC.get(`${URL}/api/cars?platenum=` + data, {
      headers: {
        ['Content-Type']: 'application/json',
        ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
      }
    }).pipe(map(res => {
      if (res[0]) {
        return true;
      }
      return false;
    }));
  }

  public checknumtaxi(data): Observable<boolean> {
    return this.httpC.get<boolean>(`${URL}/api/cars?numTaxi=` + data, {
      headers: {
        ['Content-Type']: 'application/json',
        ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
      }
    }).pipe(map(res => {
      if (res[0]) {
        return true;
      }
      return false;
    }));
  }

  public createCar(data: Car) {
    console.log("Dialog outputService:", data)
    // return this.http.post(`${URL}/api/drivers`,JSON.stringify(data));
    return this.httpC.post(`${URL}/api/cars`, data, {
      headers: {
        ['Content-Type']: 'application/json',
        ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
      }
    })
      .pipe(map(res => { return res }), catchError(err => { return throwError(new ErrorCar(err.json())) }));
  }

  public deleteCar(data: string): Observable<boolean> {
    return this.httpC.delete(`${URL}/api/cars/` + data, {
      headers: {
        ['Content-Type']: 'application/json',
        ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
      }
    }).pipe(map(res => true), catchError(err => { return throwError(err + data) })
    )
  }
  public updateCar(data: Car): Observable<boolean> {
    console.log("update", data)
    return this.httpC.put(`${URL}/api/cars/` + data.id, data, {
      headers: {
        ['Content-Type']: 'application/json',
        ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
      }
    })
      .pipe(map(res => true),
        catchError(err => { return throwError(err + data) })
      )

  }

  public getAllMakes(): Observable<Make> {
    return this.httpC.get<Make>('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json').pipe(map(res => {
      return res;
    }));;
  }
  public getModel(brand): Observable<Model> {
    return this.httpC.get<Model>('https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/' + brand + '?format=json').pipe(map(res => {
      return res;
    }));
  }

}
