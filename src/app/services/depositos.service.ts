import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class DepositosService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient) { }
  hd_depositos_get() {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Depositos';
    return this.http.get<any>(url_api).toPromise();
  }
  hd_depositos_patch(id, Deposito) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Depositos/' +
      id;
    return this.http
      .patch<any>(url_api, JSON.stringify(Deposito), { headers: this.headers })
      .toPromise();
  }
  hd_DetalleDepositos_get(Deposito) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/DetalleDepositos?filter={"where":{"IdDeposito": "' +
      Deposito +
      '"}}';
    return this.http.get<any>(url_api).toPromise();
  }
}
