import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class EntregasService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient) { }
  hd_entregas_get(Regional, Tienda, Estado, CodUsuario, FechaInicio, FechaFin) {
    var fechaini = moment(FechaInicio).format('YYYY-MM-DD');
    var fechafin = moment(FechaFin).format('YYYY-MM-DD');

    if (CodUsuario == 'Todos') {
      if (Tienda == 'Todas') {
        if (Estado == 'Todos') {
          const url_api =
            GlobalConstants.GlobalConstants.Loopback +
            ':' +
            GlobalConstants.GlobalConstants.LoopbackPort +
            '/api/Entregas?filter={"order":"FechaEntrega DESC","where":{"IdEntrega":{"neq":"null"},"FechaEntrega": {"between": ["' +
            fechaini +
            'T00:00:00.000Z","' +
            fechafin +
            'T23:59:59.999Z"]}}}';
          return this.http.get<any>(url_api).toPromise();
        } else {
          const url_api =
            GlobalConstants.GlobalConstants.Loopback +
            ':' +
            GlobalConstants.GlobalConstants.LoopbackPort +
            '/api/Entregas?filter={"order":"FechaEntrega DESC","where":{"IdEntrega":{"neq":"null"},"Estado":"' +
            Estado +
            '","FechaEntrega": {"between": ["' +
            fechaini +
            'T00:00:00.000Z","' +
            fechafin +
            'T23:59:59.999Z"]}}}';
          return this.http.get<any>(url_api).toPromise();
        }
      } else {
        if (Estado == 'Todos') {
          const url_api =
            GlobalConstants.GlobalConstants.Loopback +
            ':' +
            GlobalConstants.GlobalConstants.LoopbackPort +
            '/api/Entregas?filter={"order":"FechaEntrega DESC","where":{"IdEntrega":{"neq":"null"},"Tienda":"' +
            Tienda +
            '","Tienda":"' +
            Tienda +
            '","FechaEntrega": {"between": ["' +
            fechaini +
            'T00:00:00.000Z","' +
            fechafin +
            'T23:59:59.999Z"]}}}';
          return this.http.get<any>(url_api).toPromise();
        } else {
          const url_api =
            GlobalConstants.GlobalConstants.Loopback +
            ':' +
            GlobalConstants.GlobalConstants.LoopbackPort +
            '/api/Entregas?filter={"order":"FechaEntrega DESC","where":{"IdEntrega":{"neq":"null"},"Tienda":"' +
            Tienda +
            '","Tienda":"' +
            Tienda +
            '","Estado":"' +
            Estado +
            '","FechaEntrega": {"between": ["' +
            fechaini +
            'T00:00:00.000Z","' +
            fechafin +
            'T23:59:59.999Z"]}}}';
          return this.http.get<any>(url_api).toPromise();
        }
      }
    } else {
      if (Tienda == 'Todas') {
        if (Estado == 'Todos') {
          const url_api =
            GlobalConstants.GlobalConstants.Loopback +
            ':' +
            GlobalConstants.GlobalConstants.LoopbackPort +
            '/api/Entregas?filter={"order":"FechaEntrega DESC","where":{"IdEntrega":{"neq":"null"},"CodUsuario":"' +
            CodUsuario +
            '","FechaEntrega": {"between": ["' +
            fechaini +
            'T00:00:00.000Z","' +
            fechafin +
            'T23:59:59.999Z"]}}}';
          return this.http.get<any>(url_api).toPromise();
        } else {
          const url_api =
            GlobalConstants.GlobalConstants.Loopback +
            ':' +
            GlobalConstants.GlobalConstants.LoopbackPort +
            '/api/Entregas?filter={"order":"FechaEntrega DESC","where":{"IdEntrega":{"neq":"null"},"CodUsuario":"' +
            CodUsuario +
            '","Estado":"' +
            Estado +
            '","FechaEntrega": {"between": ["' +
            fechaini +
            'T00:00:00.000Z","' +
            fechafin +
            'T23:59:59.999Z"]}}}';
          return this.http.get<any>(url_api).toPromise();
        }
      } else {
        if (Estado == 'Todos') {
          const url_api =
            GlobalConstants.GlobalConstants.Loopback +
            ':' +
            GlobalConstants.GlobalConstants.LoopbackPort +
            '/api/Entregas?filter={"order":"FechaEntrega DESC","where":{"IdEntrega":{"neq":"null"},"CodUsuario":"' +
            CodUsuario +
            '","Tienda":"' +
            Tienda +
            '","FechaEntrega": {"between": ["' +
            fechaini +
            'T00:00:00.000Z","' +
            fechafin +
            'T23:59:59.999Z"]}}}';
          return this.http.get<any>(url_api).toPromise();
        } else {
          const url_api =
            GlobalConstants.GlobalConstants.Loopback +
            ':' +
            GlobalConstants.GlobalConstants.LoopbackPort +
            '/api/Entregas?filter={"order":"FechaEntrega DESC","where":{"IdEntrega":{"neq":"null"},"CodUsuario":"' +
            CodUsuario +
            '","Tienda":"' +
            Tienda +
            '","Estado":"' +
            Estado +
            '","FechaEntrega": {"between": ["' +
            fechaini +
            'T00:00:00.000Z","' +
            fechafin +
            'T23:59:59.999Z"]}}}';
          console.log(url_api);

          return this.http.get<any>(url_api).toPromise();
        }
      }
    }
  }

  hd_entregas_get_Total(CodUsuario, Fecha) {
    var fecha = moment(Fecha).format('YYYY-MM-DD');
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Entregas/count?where={"CodUsuario":"' +
      CodUsuario +
      '","FechaEntrega": {"between": ["' +
      fecha +
      'T00:00:00.000Z","' +
      fecha +
      'T23:59:59.999Z"]}}';
    return this.http.get<any>(url_api).toPromise();
  }

  hd_entregas_get_finalizadas(CodUsuario, Fecha) {
    var fecha = moment(Fecha).format('YYYY-MM-DD');
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Entregas/count?where={"CodUsuario":"' +
      CodUsuario +
      '","Estado":"Finalizado","FechaEntrega": {"between": ["' +
      fecha +
      'T00:00:00.000Z","' +
      fecha +
      'T23:59:59.999Z"]}}';
    return this.http.get<any>(url_api).toPromise();
  }
  hd_entregas_post(Entrega) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Entregas'
    return this.http
      .post<any>(url_api, JSON.stringify(Entrega), { headers: this.headers })
      .toPromise();
  }
  hd_entregas_patch(Entrega) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Entregas/' +
      Entrega.IdEntrega;
    return this.http
      .patch<any>(url_api, JSON.stringify(Entrega), { headers: this.headers })
      .toPromise();
  }
  hd_EnviarEntregaFirebase_put(Entrega) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Entregas/EnviarEntregaFirebase';
    return this.http
      .put<any>(url_api, Entrega, { headers: this.headers })
      .toPromise();
  }
  hd_EnviarEntregaFirebase_delete(Entrega) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Entregas/DeleteEntregaFirebase';
    return this.http
      .put<any>(url_api, JSON.stringify(Entrega), { headers: this.headers })
      .toPromise();
  }

  hd_entregas_get_last() {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Entregas?filter={"order":"OrderId DESC","limit":"1","where":{"IdEntrega":{"neq": "null"},"Tienda":"Pedidos"},"fields":"OrderId"}';
    return this.http.get<any>(url_api).toPromise();
  }
  hd_entregas_get_exists(IdEntrega) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Entregas/' + IdEntrega + '/exists';
    return this.http.get<any>(url_api).toPromise();
  }
  hd_entregas_get_count(CodUsuario, FechaSeleccionadaInicio, FechaSeleccionadaFin) {
    var fechaini = moment(FechaSeleccionadaInicio).format('YYYY-MM-DD');
    var fechafin = moment(FechaSeleccionadaFin).format('YYYY-MM-DD');
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Entregas/count?where={"CodUsuario":"' + CodUsuario + '","FechaEntrega":{"between":["' + fechaini + 'T00:00:00.000Z","' + fechafin + 'T23:59:59.999Z"]}}';
    return this.http.get<any>(url_api).toPromise();
  }

  hd_entregas_get_count_finalizadas(CodUsuario, FechaSeleccionadaInicio, FechaSeleccionadaFin) {
    var fechaini = moment(FechaSeleccionadaInicio).format('YYYY-MM-DD');
    var fechafin = moment(FechaSeleccionadaFin).format('YYYY-MM-DD');
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Entregas/count?where={"CodUsuario":"' + CodUsuario + '","Estado":"Finalizado","FechaEntrega":{"between":["' + fechaini + 'T00:00:00.000Z","' + fechafin + 'T23:59:59.999Z"]}}';
    return this.http.get<any>(url_api).toPromise();
  }
}
