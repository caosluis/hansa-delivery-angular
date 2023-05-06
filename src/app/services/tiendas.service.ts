import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class TiendasService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient) {}
  hd_tiendas_get() {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Tiendas';
    return this.http.get<any>(url_api).toPromise();
  }
  hd_tiendas_post(Almacen) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Tiendas';
    return this.http
      .post<any>(url_api, JSON.stringify(Almacen), { headers: this.headers })
      .toPromise();
  }
}
