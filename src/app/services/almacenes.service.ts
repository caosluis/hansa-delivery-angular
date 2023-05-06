import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class AlmacenesService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient) { }

  hd_almacenes_get() {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Almacenes';
    return this.http.get<any>(url_api).toPromise();
  }
  hd_almacenes_post(Almacen) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Almacenes';
    return this.http
      .post<any>(url_api, JSON.stringify(Almacen), { headers: this.headers })
      .toPromise();
  }
}
