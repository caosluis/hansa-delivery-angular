import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UserpasswordService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient) { }
  hd_userpasswords_post(Conductor) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/UserPasswords';
    return this.http
      .patch<any>(url_api, JSON.stringify(Conductor), { headers: this.headers })
      .toPromise();
  }
}
