import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { Http, RequestOptions  } from "@angular/http";
import {HttpClient, HttpParams,HttpHeaders} from "@angular/common/http";
// import 'rxjs/add/operator/map';
import { map,catchError } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { tokenKey } from '@angular/core/src/view';
import { AdminService } from './admin.service'

export class User {
    username : string;
    password : string;
    lastname:string;
    firstname:string;
    is_staff:boolean;
    driver:Driver
    constructor(data){
        this.username = data.username;
        this.password = data.password;
        this.lastname = data.lastname;
        this.firstname = data.firstname;
        this.is_staff = data.is_staff;
        this.driver = data.driver
    }
}

export class Driver {
    id:string;
    // user : User
    // username : User['username']
    // password : User['password']

    birthdate:Date;
    owner:boolean;
    adress:string;
    addnum:number;
    locality:number
    licenseExp:Date;

    constructor(data){
        this.id = data.id;
        // this.user = data.user
        // this.username = data.username;
        // this.password = data.password

        this.birthdate = data.birthdate;
        this.owner = data.owner;
        this.adress = data.adress;
        this.addnum = data.addnum;
        this.locality = data.locality;
        this.licenseExp = data.licenseExp;

    }
}

const URL = 'http://localhost:8000';
// const URL  = 'http://192.168.1.11:8000';
// const URL = 'https://taxidrf.herokuapp.com'

@Injectable()
export class DriverService {
    private httpOptions: any;
    dataChange: BehaviorSubject<Driver[]> = new BehaviorSubject<Driver[]>([]);
    constructor(private http:Http,private httpC:HttpClient,private adminS:AdminService){
    }

    // public getAll(): Observable<Driver[]> {
    //     return this.http.get(`${URL}/drivers`)
    //         .pipe(map(result => {
    //             let tmp: Driver[] = [];
    //             for (let o of result.json())
    //                 tmp.push(new Driver(o));
    //             return tmp;
    //             }), catchError( error => {
    //                 return throwError( error + 'bug!' )
    //               })
    //         )
    // }
    // public getAll(token): Observable<Driver[]> {
    //     this.httpOptions = {
    //         headers: new HttpHeaders({
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //           'Authorization':  token
    //         })
    //       };

    //     return this.http.get(`${URL}/api/drivers`,{headers:new HttpHeaders()
    //         .set('Authorization','Basic' + token)
    //         .set('Content-Type','application/json')})
    //         .pipe(map(result => {
    //             return result.json().map(json=> new Driver(json),console.log('from api',result));
    //         }));
    // }
    public getAll(): Observable<Array<User>> {
        // console.log(sessionStorage.getItem('username'),sessionStorage.getItem('password'),token,this.adminS.tokenStorage.token)
        // marche pas mais ca drvrait etre comme ca pour un header
        this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + this.adminS.tokenStorage.token,
            //   'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            })
        };
        console.log('header',this.httpOptions)
        return this.httpC.get<Array<User>>(`${URL}/api/users`,{headers:{
            ['Content-Type']:'application/json',
            // ['Content-Type']: 'application/json',
            ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }}
        // {
        //     headers:new HttpHeaders()
        //         .set('Content-Type','application/json')
        //         .set('Authorization','JWT '+ this.adminS.tokenStorage.token)
        //         .set("Access-Control-Allow-Origin", "*")
        //         .set('Access-Control-Allow-Credential','true')
        //         .set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
        //         .set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
        // }
        ).pipe(map(res=>{console.log('hop',res);return res}))
    }

    public getSelected(data:Driver):Observable<Driver[]>{
        return this.http.get(`${URL}/api/drivers/`+data.id)
            .pipe(map(res=>{
                return res.json().map(json=> new Driver(json),console.log('from api',res));
            }))
    }
    public getUser(id:string){
        return this.httpC.get<User>(`${URL}/api/users/`+id,{headers:{
            ['Content-Type']:'application/json',
            // ['Content-Type']: 'application/json',
            ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }}
        )
    }


    public createDriver(data:User){
        this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': this.adminS.tokenStorage.token,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            })
        };
        console.log("Dialog outputService:", data)
        // return this.http.post(`${URL}/api/drivers`,JSON.stringify(data));
        return this.httpC.post(`${URL}/api/users`,data,{headers:{
            ['Content-Type']:'application/json',
            ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }})
            .pipe(map(res => {return res}, catchError( err => {return throwError(err+data)})));
    }

    public deleteDriver(data:string):Observable<boolean>{
        return this.httpC.delete(`${URL}/api/drivers/`+data,{headers:{
            ['Content-Type']:'application/json',
            ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }}).pipe(map(res=>true),catchError( err => {return throwError(err+data)})
        )
    }
    public updateDriver(data:Driver):Observable<boolean>{
        console.log("update",data)
        return this.httpC.put(`${URL}/api/drivers/`+data.id,data,{headers:{
            ['Content-Type']:'application/json',
            ['Authorization']: 'JWT ' + this.adminS.tokenStorage.token,
            }})
            .pipe(map(res=>true),
            catchError( err => {return throwError(err+data)})
            )

    }
    public checkusername(data): Observable<boolean> {
      return this.httpC.get(`${URL}/api/users?username=` + data, {
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





    // public findSocieties(
    //     filter = '', sortOrder = 'asc',
    //     pageNumber = 0, pageSize = 3):  Observable<Society[]> {

    //     return this.http.get(`${URL}/societies`, {
    //         params: new HttpParams()
    //             // .set('societyId', societyId.toString())
    //             .set('filter', filter)
    //             .set('sortOrder', sortOrder)
    //             .set('pageNumber', pageNumber.toString())
    //             .set('pageSize', pageSize.toString())
    //     }).pipe(
    //         map(res =>  res["payload"])
    //     );
    // }


}
