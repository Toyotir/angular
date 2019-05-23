
import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  token
  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {

    this.token = sessionStorage.getItem('token');
  }

  
}