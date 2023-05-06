import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class FotosService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private HttpClient: HttpClient) { }
  hd_fotos_get_Firma(IdEntrega, TipoDocumento) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Fotos?filter={"where":{"IdEntrega":"' +
      IdEntrega +
      '","TipoDocumento":"' +
      TipoDocumento +
      '"}}';
    return this.HttpClient.get<any>(url_api).toPromise();
  }
  hd_fotos_get_Respaldo(IdEntrega, TipoDocumento) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Fotos?filter={"where":{"IdEntrega":"' +
      IdEntrega +
      '","TipoDocumento":"' +
      TipoDocumento +
      '"}}';
    return this.HttpClient.get<any>(url_api).toPromise();
  }
}
