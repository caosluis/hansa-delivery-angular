import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class ConductoresService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient) { }

  hd_conductores_get() {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Conductores';
    return this.http.get<any>(url_api).toPromise();
  }
  hd_conductores_get_panelIzquierdo(Regional) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Conductores?filter={"where":{"Estado":"Activo","Regional":"' + Regional + '"}}';

    return this.http.get<any>(url_api).toPromise();
  }
  hd_conductores_patch(id, Conductor) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Conductores/' +
      id;
    return this.http
      .patch<any>(url_api, JSON.stringify(Conductor), { headers: this.headers })
      .toPromise();
  }
  hd_conductores_post(Conductor) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Conductores';
    return this.http
      .patch<any>(url_api, JSON.stringify(Conductor), { headers: this.headers })
      .toPromise();
  }
}
