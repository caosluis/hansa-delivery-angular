import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class CommonsService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private HttpClient: HttpClient) { }
  divisiones_get() {
    return this.HttpClient.get<any>('./assets/divisiones.json').toPromise();
  }
  sectores_get() {
    return this.HttpClient.get<any>('./assets/sectores.json').toPromise();
  }
  regionales_get() {
    return this.HttpClient.get<any>('./assets/regionales.json').toPromise();
  }
  tipovehiculo_get() {
    return this.HttpClient.get<any>('./assets/TipoVehiculo.json').toPromise();
  }
  zona_get() {
    return this.HttpClient.get<any>('./assets/Zona.json').toPromise();
  }
  moneda_get() {
    return this.HttpClient.get<any>('./assets/Moneda.json').toPromise();
  }
}
