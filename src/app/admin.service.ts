import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions } from "@angular/http";
import { Observable,interval,timer } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { JwtHelperService,JwtModule,JwtModuleOptions } from '@auth0/angular-jwt';
import { stringify } from 'querystring';
import { DatePipe } from '@angular/common';

export class TokenDRF {
  token:string;
  constructor(data){
      this.token = data.token;
  }
}
export class User {
  username : string;
  password : string;
  lastname:string;
  firstname:string;
  is_staff:boolean;
  constructor(data){
      this.username = data.username;
      this.password = data.password;
      this.lastname = data.lastname;
      this.firstname = data.firstname;
      this.is_staff = data.is_staff;
  }
}
// const URL = 'http://localhost:8000';
const URL = 'https://taxidrf.herokuapp.com';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private httpOptions: any;
  isLog: boolean;
  public token: string;
  public token_expires: Date;
  public expirationDate;
  public isExpired;
  isAdmin: boolean;
  public username: string;
  password: string;
  redirectUrl: string;
  public tokenStorage: TokenDRF;
  public tokenTimer = interval(1000);
  public teokenTimer2 = timer(3590000, 3590000);


  constructor(private httpClient: HttpClient, private http: Http,private dp:DatePipe) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  }

  // public login(data) {
  //   console.log('ask token', data)
  //   return this.http.post(`${URL}/api-token-auth/`, data).subscribe(
  //     data => {
  //       this.updateData(data);
  //       this.isLog = true;
  //       console.log('from django', data)
  //     },
  //     err => {
  //       // this.errors = err['error'];
  //     }
  //   );
  // }
  public getUser(id:string){
    return this.httpClient.get<User>(`${URL}/api/users/`+id,{headers:{
      ['Content-Type']:'application/json',
      // ['Content-Type']: 'application/json',
      ['Authorization']: 'JWT ' + this.tokenStorage.token,
      }}
    ).pipe(map(res=>{
      this.isLog = false;
      this.isAdmin = res.is_staff;
      console.log('isadminservice2',this.isAdmin)
    }));
 }
  public login(data):Observable<boolean> {
    // console.log('ask token', data)
    sessionStorage.setItem('username',data.username)
    sessionStorage.setItem('password',data.password)
    return this.http.post(`${URL}/api-token-auth/`, data).pipe(map(res1 => {

        this.isLog = true;
        // sessionStorage.setItem('token',data.json())
        this.tokenStorage = new TokenDRF(res1.json());
        sessionStorage.setItem('token',this.tokenStorage.token)
        this.updateData(this.tokenStorage);
        // console.log('from django sotrage', sessionStorage.getItem('token'),'+',this.tokenStorage.token)
        if (this.tokenStorage !== null) {
          console.log('isadminservice1',this.isAdmin)
          const helper = new JwtHelperService();
          const id = helper.decodeToken(this.tokenStorage.token);
          this.isAdmin = true;
          this.getUser(id.user_id).subscribe();
          return true;
          // if(this.getUser(id.user_id).subscribe()) {
          //   this.isAdmin = true;
          //   console.log('true')
          // } else {
          //   this.isAdmin = false;
          //   console.log('false')
          // }
        } else {
          return false;
        }
      }, err => {
        // this.errors = err['error'];
      }
    ));
  }

  public refreshToken() {
    console.log('represend')
    return this.http.post(`${URL}/api-token-refresh/`,{token:this.tokenStorage.token}).pipe(map(
      data => {
        console.log('refreshtoken',data)
        this.tokenStorage = new TokenDRF(data.json());
        this.updateData(this.tokenStorage);

      },
      err => {
        // this.errors = err['error'];
      }
    ));
  }

  public tokenStartTimer(token){
    const helper = new JwtHelperService();
    var exp = helper.decodeToken(token)
    const timer3 = timer(new Date(exp.exp*1000-10000), 3600000);
    console.log('timer3',timer3)
    timer3.subscribe(res=>{
      console.log('in timer',res,exp.exp+3590000,timer3)
        this.refreshToken().subscribe(res=>{ res })
    })
    // let tot = this.tokenTimer + 3600
    // while(this.tokenTimer != tot){
    //   this.tokenTimer
    //   console.log('timer',this.tokenTimer)
    // }
    // this.refreshToken()
  }


  public logout() {
    this.token = null
    this.isLog = false;
    this.isAdmin = false;
    this.username = null
    this.password = null
    this.tokenStorage = null;
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('password')
    sessionStorage.removeItem('token')
  }

  private updateData(token) {
    const helper = new JwtHelperService();
    console.log('token',helper.decodeToken(token.token),helper.getTokenExpirationDate(token.token))
    const exp = helper.decodeToken(token.token)
    this.token = token;
    // this.errors = [];
    // console.log('token', token)
    // decode the token to read the username and expiration timestamp
    // const token_parts = token
    // this.expirationDate = helper.getTokenExpirationDate(sessionStorage.getItem('token'));
    // this.isExpired = helper.isTokenExpired(token);
    // const token_parts2 = this.token.split(/\./);
    // const token_decoded = JSON.parse(window.atob(token_parts[1]));
    // const token_decoded2 = JSON.parse(window.atob(token_parts[2]));
    // this.token_expires = new Date(token_decoded.exp * 1000);

    // this.username = token_decoded.username;
    // this.password = token_decoded2.password;
    console.log('split',exp.orig_iat,exp.exp,new Date(exp.exp*1000),new Date(exp.exp*1000-10000));
  }
}
