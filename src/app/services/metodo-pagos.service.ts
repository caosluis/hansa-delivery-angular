import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class MetodoPagosService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient) {}
  hd_metodopagos_get() {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/MetodoPagos';
    return this.http.get<any>(url_api).toPromise();
  }
  hd_metodopagos_post(Metodo) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/MetodoPagos';
    return this.http
      .post<any>(url_api, JSON.stringify(Metodo), { headers: this.headers })
      .toPromise();
  }
  hd_metodopagos_patch(IDMetodoPago, Metodo) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/MetodoPagos/' +
      IDMetodoPago;
    return this.http
      .patch<any>(url_api, JSON.stringify(Metodo), { headers: this.headers })
      .toPromise();
  }
}
