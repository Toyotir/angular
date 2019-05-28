import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Http, RequestOptions } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
// import { Time } from "@angular/common"
// import 'rxjs/add/operator/map';
import { map, catchError } from 'rxjs/operators';
import { Driver } from './driver.service'
import { Car } from './car.service'
import { AdminService } from './admin.service'

export class Society {
    id: string;
    name: string;
    tva: string;
    owner: string;
    adress: string;
    addnum: Number
    locality: Number
    drivers: Driver[]
    cars: Car[]

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.tva = data.tva;
        this.owner = data.owner;
        this.adress = data.adress
        this.addnum = data.addnum
        this.locality = data.locality
        this.drivers = data.drivers
        this.cars = data.cars
    }
}
export class Time {
    hours: number;
    minutes: number;
}
export class Roadsheet {
    id: string;
    sheetnum: Number
    kmStart: Number
    kmEnd: Number
    date: Date
    socname: Society
    driver: Driver
    car: Car
    startWorking: Time
    endWorking: Time
    totprice: Number
    rides: Ride[]
    constructor(data) {
        this.id = data.id;
        this.sheetnum = data.sheetnum
        this.kmStart = data.kmStart
        this.kmEnd = data.kmEnd
        this.date = data.date
        this.socname = data.socname
        this.driver = data.driver
        this.car = data.car
        this.startWorking = data.startWorking
        this.endWorking = data.endWorking
        this.totprice = data.totprice
        this.rides = data.rides
    }
}

export class Ride {
    id: string
    idr: Number
    boarding: string
    timeB: Time
    landing: string
    timeL: Time
    price: Number
    roadsheet: Roadsheet
    path:number[]
    constructor(data) {
        this.id = data.id
        this.idr = data.idr
        this.boarding = data.boarding
        this.timeB = data.timeB
        this.landing = data.landing
        this.timeL = data.timeL
        this.price = data.price
        this.roadsheet = data.roadsheet
        this.path = data.path

    }
}

// export interface Society{
//     name:string;
//     tva:string;
//     owner:string;
// }

// const URL = 'http://localhost:8000';
// const URL = 'http://192.168.1.11:8000';
const URL = 'https://taxidrf.herokuapp.com';

@Injectable()
export class SocietyService {
    constructor(private http: Http, private adminS: AdminService, private httpc: HttpClient) {}

    public getAll(): Observable<Society[]> {
        return this.httpc.get<Society[]>(`${URL}/api/societies`, {
            headers: {
                ['Content-Type']: 'application/json',
                ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }
        })
    }
    //society add
    public createDriver(data: Society) {
        console.log("Dialog outputService:", data)
        // return this.http.post(`${URL}/api/drivers`,JSON.stringify(data));
        return this.httpc.post(`${URL}/api/societies`, data, {
            headers: {
                ['Content-Type']: 'application/json',
                ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }
        })
            .pipe(map(res => { return res })), catchError(err => { return throwError(err + data) });
    }

    public deleteSociety(data: Society): Observable<boolean> {
        console.log("Dialog outputService:", data.id)
        return this.httpc.delete(`${URL}/api/societies/` + data.id, {
            headers: {
                ['Content-Type']: 'application/json',
                ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }
        })
            .pipe(map(res => true),
                catchError(err => { return throwError(err + data) })
            )
    }

    public updateSociety(data: Society): Observable<boolean> {
        console.log("update", data)
        return this.httpc.put(`${URL}/api/societies/` + data.id, data, {
            headers: {
                ['Content-Type']: 'application/json',
                ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }
        })
            .pipe(map(res => true),
                catchError(err => { return throwError(err + data) })
            )

    }
    public getroadbysoc(data): Observable<Roadsheet[]> {
      return this.httpc.get<Roadsheet[]>(`${URL}/api/roadsheets?socname=` + data, {
          headers: {
              ['Content-Type']: 'application/json',
              ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
          }
      });
    }

    public getRoad(): Observable<Roadsheet[]> {
        return this.httpc.get<Roadsheet[]>(`${URL}/api/roadsheets`, {
            headers: {
                ['Content-Type']: 'application/json',
                ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }
        });
    }
    public getRides(): Observable<Ride[]> {
        return this.httpc.get<Ride[]>(`${URL}/api/rides`, {
            headers: {
                ['Content-Type']: 'application/json',
                ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }
        });
    }

    public getRide(id): Observable<Ride> {
        return this.httpc.get<Ride>(`${URL}/api/rides/` + id, {
            headers: {
                ['Content-Type']: 'application/json',
                ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }
        });
    }

    getSoc(): Observable<Society[]> {
        console.log('getsoc');
        return this.httpc.get<Society[]>(`${URL}/api/societies`, {
            headers: {
                ['Content-Type']: 'application/json',
                ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }
        });

    }

    public findSocieties(data): Observable<boolean> {
      return this.httpc.get(`${URL}/api/societies?name=` + data, {
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
    public findTVA(data): Observable<boolean> {
      return this.httpc.get(`${URL}/api/societies?tva=` + data, {
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
}
