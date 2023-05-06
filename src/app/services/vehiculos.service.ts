import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VehiculosService {
  constructor(private HttpClient: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  his_tipovehiculo_get() {
    return this.HttpClient.get<any>('./assets/TipoVehiculo.json').toPromise();
  }
}