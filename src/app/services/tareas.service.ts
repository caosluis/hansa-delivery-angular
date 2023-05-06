import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient) { }

  hd_tareas_get(IdEntrega) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Tareas?filter={"where":{"IdEntrega":"' +
      IdEntrega +
      '"}}';

    return this.http.get<any>(url_api).toPromise();
  }
  hd_tareas_get_panel_izquierdo() {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Tareas';
    return this.http.get<any>(url_api).toPromise();
  }
  hd_tareas_post(Tarea) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Tareas';
    return this.http
      .post<any>(url_api, JSON.stringify(Tarea), { headers: this.headers })
      .toPromise();
  }
  hd_EnviarTareaFirebase_put(Tarea) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Tareas/EnviarTareaFirebase';
    return this.http
      .put<any>(url_api, Tarea, { headers: this.headers })
      .toPromise();
  }
  hd_tareas_delete(IdTarea) {
    const url_api =
      GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.LoopbackPort +
      '/api/Tareas/' +
      IdTarea;
    return this.http.delete<any>(url_api).toPromise();
  }
}
