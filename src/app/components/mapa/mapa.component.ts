import { Component, OnInit, ViewChild, Input } from '@angular/core';
import 'leaflet';
import { Socket } from 'ngx-socket-io';
import * as moment from 'moment';
import { NgElement, WithProperties } from '@angular/elements';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PopupComponent } from '../popup/popup.component';
import { ConductoresService } from 'src/app/services/conductores.service';
import { EntregasService } from 'src/app/services/entregas.service';
import { TareasService } from 'src/app/services/tareas.service';
import { AsignarEntregaComponent } from '../asignar-entrega/asignar-entrega.component';
import { ConfiguracionesComponent } from '../configuraciones/configuraciones.component';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import { CommonsService } from 'src/app/services/commons.service';
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.js';
import { GestureHandling } from 'leaflet-gesture-handling';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import { AlmacenesService } from 'src/app/services/almacenes.service';
import { TiendasService } from 'src/app/services/tiendas.service';
import { SocketioService } from 'src/app/services/socketio.service';
import * as XLSX from 'xlsx';
import { CreacionEntregaComponent } from '../creacion-entrega/creacion-entrega.component';
import { MetodoPagosService } from '../../services/metodo-pagos.service';

declare let L;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {

  cargadorIzquierdo = false;
  cargadorEntrega = false;

  cargandoDescarga = false;
  map: any;
  closeResult = '';
  cuadrillas: any = [];
  tareas: any = [];
  cliente: any = [];
  supervisor: any = [];
  supervisor_dynamic = [];
  ots: any = [];
  ConductoresList: any;
  EntregasList: any;
  TareasList: any;
  MarcadoresCliente = [];
  MarcadoresConductor = [];
  MarcadoresAlmacenes = [];

  IndicadorFinalizadas: any = 0;
  IndicadorTotales: any = 0;

  RegionalesList: any;
  DivisionesList: any;
  TiendasList: any;
  AlmacenesList: any;
  metodopagosList: any;

  ContadorEntregas: any = [];
  ContadorEntregasFinalizadas: any = [];

  RegionalSeleccionada: any = 'La Paz';
  TiendaSeleccionada: any = 'Todas';
  DivisionSeleccionada: any;
  EstadoSeleccionado: any = 'Todos';
  ConductorSeleccionado: any = 'Todos';

  fileName: any;

  EntregasColumns: string[] = [
    'PedidoNro',
    'Estado',
    'Conductor',
    'Zona',
    'Direccion',
    'Almacen',
    'Cliente',
    'MetodoPago',
    'FechaEntrega',
    'Actions',
  ];
  FiltroEstadoVisitas = [
    'En Camino',
    'Cancelado',
    'En Progreso',
    'Finalizado',
    'Nuevo',
  ];

  IconAlmacen = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#0068dc;' class='marker-pin'></div><i class='material-icons'>store</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });

  IconNuevo = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#6c757d;' class='marker-pin'></div><i class='material-icons'>home</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });
  IconNuevoPlan = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#6c757d;' class='marker-pin'></div><i class='material-icons'>local_shipping</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });

  IconCancelado = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#dc3545;' class='marker-pin'></div><i class='material-icons'>home</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });
  IconCanceladoPlan = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#dc3545;' class='marker-pin'></div><i class='material-icons'>local_shipping</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });

  IconFinalizado = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#28a745;' class='marker-pin'></div><i class='material-icons'>home</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });
  IconFinalizadoPlan = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#28a745;' class='marker-pin'></div><i class='material-icons'>local_shipping</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });
  IconEnCamino = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#f67a2e;' class='marker-pin'></div><i class='material-icons'>home</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });
  IconEnCaminoPlan = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#f67a2e;' class='marker-pin'></div><i class='material-icons'>local_shipping</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });

  IconEnProgreso = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#ffc107;' class='marker-pin jumping'></div><i class='material-icons'>home</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });
  IconEnProgresoPlan = L.divIcon({
    className: 'custom-div-icon-progress',
    html:
      "<div class='gps_ring'><div style='background-color:#ffc107;' class='marker-pin'></div><i class='material-icons'>settings</i></div>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });

  FechaActual: any = new Date();

  FechaSeleccionadaInicio: any = new Date();
  FechaSeleccionadaFin: any = new Date();

  Entregas: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public MatDialog: MatDialog,
    private ConductoresService: ConductoresService,
    private EntregasService: EntregasService,
    private TareasService: TareasService,
    private CommonsService: CommonsService,
    private AlmacenesService: AlmacenesService,
    private TiendasService: TiendasService,
    private MetodoPagosService: MetodoPagosService,
    private SocketioService: SocketioService,
    private socket: Socket,
  ) {
    this.socket.on('Entrega_Progreso', (point) => {
      if (
        moment(point.FechaEntrega).format('YYYY-MM-DD') ==
        moment(this.FechaActual).format('YYYY-MM-DD')
      ) {
        this.updateVisita(point);
        this.AgregarMarcador(point);
        this.Refresh();
      }
    });
    this.socket.on('Tarea_Ingresa_Modificado', (point) => {
      this.RefreshTareas();
    });
    this.socket.on('Conductor_Ingresa_Modificado', (point) => {
      this.CargarConductores();
    });

  }

  updateVisita(EntregaEntrante) {
    this.QuitarMarcador(EntregaEntrante.IdEntrega);
    if (
      this.EntregasList.some(
        (Entrega) => Entrega.IdEntrega === EntregaEntrante.IdEntrega
      )
    ) {
      this.EntregasList.forEach((Entrega) => {
        if (Entrega.IdEntrega == EntregaEntrante.IdEntrega) {
          Entrega.CodUsuario = EntregaEntrante.CodUsuario;
          Entrega.Estado = EntregaEntrante.Estado;
          Entrega.FechaRecojoAlmacen = EntregaEntrante.FechaRecojoAlmacen;
          Entrega.FechaEntregaCliente = EntregaEntrante.FechaEntregaCliente;
          Entrega.FechaEntrega = EntregaEntrante.FechaEntrega;
          Entrega.LatitudReal = EntregaEntrante.LatitudReal;
          Entrega.LongitudReal = EntregaEntrante.LongitudReal;
          Entrega.Observacion = EntregaEntrante.Observacion;
          Entrega.UsuarioFecha = EntregaEntrante.UsuarioFecha;
          Entrega.NroFactura = EntregaEntrante.NroFactura;
          Entrega.FacturaAIO = EntregaEntrante.FacturaAIO;
          Entrega.MetodoPago = EntregaEntrante.MetodoPago;
          Entrega.Monto = EntregaEntrante.Monto;
          Entrega.Direccion = EntregaEntrante.Direccion;
          Entrega.IdCliente = EntregaEntrante.IdCliente;
          Entrega.Latitud = EntregaEntrante.Latitud;
          Entrega.Longitud = EntregaEntrante.Longitud;
          Entrega.NitCi = EntregaEntrante.NitCi;
          Entrega.Nombre = EntregaEntrante.Nombre;
          Entrega.Telefono = EntregaEntrante.Telefono;
          Entrega.Almacen = EntregaEntrante.Almacen;
          Entrega.Descripcion = EntregaEntrante.Descripcion;
          Entrega.Nota = EntregaEntrante.Nota;
        }
      });
    } else {
      this.EntregasList.push(EntregaEntrante);
    }
  }
  QuitarMarcador(IdEntrega) {
    this.MarcadoresCliente.forEach((marker) => {
      if (marker.IdEntrega == IdEntrega) {
        const removeIndex = this.MarcadoresCliente.findIndex(
          (item) => item.IdEntrega === IdEntrega
        );
        this.map.removeLayer(marker);
        this.MarcadoresCliente.splice(removeIndex, 1);
      }
    });
    this.MarcadoresConductor.forEach((marker) => {
      if (marker.IdEntrega == IdEntrega + '_Conductor') {
        const removeIndex = this.MarcadoresConductor.findIndex(
          (item) => item.IdEntrega === IdEntrega + '_Conductor'
        );
        this.map.removeLayer(marker);
        this.MarcadoresConductor.splice(removeIndex, 1);
      }
    });
  }
  AgregarMarcador(EntregaEntrante) {
    switch (EntregaEntrante.Estado) {
      case 'Nuevo':
        var MarcadorCliente = L.marker(
          [EntregaEntrante.Latitud, EntregaEntrante.Longitud],
          {
            icon: this.IconNuevo,
          }
        );
        MarcadorCliente.IdEntrega = EntregaEntrante.IdEntrega;
        MarcadorCliente.PedidoNro = EntregaEntrante.PedidoNro;
        MarcadorCliente.Estado = EntregaEntrante.Estado;
        MarcadorCliente.Latitud = EntregaEntrante.Latitud;
        MarcadorCliente.Longitud = EntregaEntrante.Longitud;
        MarcadorCliente.bindPopup(
          (fl) => {
            const DetallePedido: NgElement &
              WithProperties<PopupComponent> = document.createElement(
                'popup-pedido'
              ) as any;
            DetallePedido.addEventListener('closed', () =>
              document.body.removeChild(DetallePedido)
            );
            DetallePedido.data = EntregaEntrante;
            document.body.appendChild(DetallePedido);
            return DetallePedido;
          },
          { maxHeight: 'auto', maxWidth: 'auto' }
        );
        MarcadorCliente.bindTooltip(
          EntregaEntrante.IdEntrega + '<br>' + EntregaEntrante.Nombre
        );
        this.map.addLayer(MarcadorCliente);
        this.MarcadoresCliente.push(MarcadorCliente);
        var MarcadorConductor = L.marker(
          [EntregaEntrante.LatitudReal, EntregaEntrante.LongitudReal],
          {
            icon: this.IconNuevoPlan,
          }
        );
        MarcadorConductor.IdEntrega = EntregaEntrante.IdEntrega + '_Conductor';
        MarcadorConductor.PedidoNro = EntregaEntrante.PedidoNro;
        MarcadorConductor.Estado = EntregaEntrante.Estado;
        MarcadorConductor.LatitudReal = EntregaEntrante.LatitudReal;
        MarcadorConductor.LongitudReal = EntregaEntrante.LongitudReal;
        MarcadorConductor.bindPopup(
          (fl) => {
            const DetallePedido: NgElement &
              WithProperties<PopupComponent> = document.createElement(
                'popup-pedido'
              ) as any;
            DetallePedido.addEventListener('closed', () =>
              document.body.removeChild(DetallePedido)
            );
            DetallePedido.data = EntregaEntrante;
            document.body.appendChild(DetallePedido);
            return DetallePedido;
          },
          { maxHeight: 'auto', maxWidth: 'auto' }
        );
        MarcadorConductor.bindTooltip(
          EntregaEntrante.IdEntrega + '<br>' + EntregaEntrante.Nombre
        );
        this.map.addLayer(MarcadorConductor);
        this.MarcadoresConductor.push(MarcadorConductor);
        break;
      case 'Cancelado':
        var MarcadorCliente = L.marker(
          [EntregaEntrante.Latitud, EntregaEntrante.Longitud],
          {
            icon: this.IconCancelado,
          }
        );
        MarcadorCliente.IdEntrega = EntregaEntrante.IdEntrega;
        MarcadorCliente.PedidoNro = EntregaEntrante.PedidoNro;
        MarcadorCliente.Estado = EntregaEntrante.Estado;
        MarcadorCliente.Latitud = EntregaEntrante.Latitud;
        MarcadorCliente.Longitud = EntregaEntrante.Longitud;
        MarcadorCliente.bindPopup(
          (fl) => {
            const DetallePedido: NgElement &
              WithProperties<PopupComponent> = document.createElement(
                'popup-pedido'
              ) as any;
            DetallePedido.addEventListener('closed', () =>
              document.body.removeChild(DetallePedido)
            );
            DetallePedido.data = EntregaEntrante;
            document.body.appendChild(DetallePedido);
            return DetallePedido;
          },
          { maxHeight: 'auto', maxWidth: 'auto' }
        );
        MarcadorCliente.bindTooltip(
          EntregaEntrante.IdEntrega + '<br>' + EntregaEntrante.Nombre
        );
        this.map.addLayer(MarcadorCliente);
        this.MarcadoresCliente.push(MarcadorCliente);
        var MarcadorConductor = L.marker(
          [EntregaEntrante.LatitudReal, EntregaEntrante.LongitudReal],
          {
            icon: this.IconCanceladoPlan,
          }
        );
        MarcadorConductor.IdEntrega = EntregaEntrante.IdEntrega + '_Conductor';
        MarcadorConductor.PedidoNro = EntregaEntrante.PedidoNro;
        MarcadorConductor.Estado = EntregaEntrante.Estado;
        MarcadorConductor.LatitudReal = EntregaEntrante.LatitudReal;
        MarcadorConductor.LongitudReal = EntregaEntrante.LongitudReal;
        MarcadorConductor.bindPopup(
          (fl) => {
            const DetallePedido: NgElement &
              WithProperties<PopupComponent> = document.createElement(
                'popup-pedido'
              ) as any;
            DetallePedido.addEventListener('closed', () =>
              document.body.removeChild(DetallePedido)
            );
            DetallePedido.data = EntregaEntrante;
            document.body.appendChild(DetallePedido);
            return DetallePedido;
          },
          { maxHeight: 'auto', maxWidth: 'auto' }
        );
        MarcadorConductor.bindTooltip(
          EntregaEntrante.IdEntrega + '<br>' + EntregaEntrante.Nombre
        );
        this.map.addLayer(MarcadorConductor);
        this.MarcadoresConductor.push(MarcadorConductor);
        break;
      case 'Finalizado':
        var MarcadorCliente = L.marker(
          [EntregaEntrante.Latitud, EntregaEntrante.Longitud],
          {
            icon: this.IconFinalizado,
          }
        );
        MarcadorCliente.IdEntrega = EntregaEntrante.IdEntrega;
        MarcadorCliente.PedidoNro = EntregaEntrante.PedidoNro;
        MarcadorCliente.Estado = EntregaEntrante.Estado;
        MarcadorCliente.Latitud = EntregaEntrante.Latitud;
        MarcadorCliente.Longitud = EntregaEntrante.Longitud;
        MarcadorCliente.bindPopup(
          (fl) => {
            const DetallePedido: NgElement &
              WithProperties<PopupComponent> = document.createElement(
                'popup-pedido'
              ) as any;
            DetallePedido.addEventListener('closed', () =>
              document.body.removeChild(DetallePedido)
            );
            DetallePedido.data = EntregaEntrante;
            document.body.appendChild(DetallePedido);
            return DetallePedido;
          },
          { maxHeight: 'auto', maxWidth: 'auto' }
        );
        MarcadorCliente.bindTooltip(
          EntregaEntrante.IdEntrega + '<br>' + EntregaEntrante.Nombre
        );
        this.map.addLayer(MarcadorCliente);
        this.MarcadoresCliente.push(MarcadorCliente);
        var MarcadorConductor = L.marker(
          [EntregaEntrante.LatitudReal, EntregaEntrante.LongitudReal],
          {
            icon: this.IconFinalizadoPlan,
          }
        );
        MarcadorConductor.IdEntrega = EntregaEntrante.IdEntrega + '_Conductor';
        MarcadorConductor.PedidoNro = EntregaEntrante.PedidoNro;
        MarcadorConductor.Estado = EntregaEntrante.Estado;
        MarcadorConductor.LatitudReal = EntregaEntrante.LatitudReal;
        MarcadorConductor.LongitudReal = EntregaEntrante.LongitudReal;
        MarcadorConductor.bindPopup(
          (fl) => {
            const DetallePedido: NgElement &
              WithProperties<PopupComponent> = document.createElement(
                'popup-pedido'
              ) as any;
            DetallePedido.addEventListener('closed', () =>
              document.body.removeChild(DetallePedido)
            );
            DetallePedido.data = EntregaEntrante;
            document.body.appendChild(DetallePedido);
            return DetallePedido;
          },
          { maxHeight: 'auto', maxWidth: 'auto' }
        );
        MarcadorConductor.bindTooltip(
          EntregaEntrante.IdEntrega + '<br>' + EntregaEntrante.Nombre
        );
        this.map.addLayer(MarcadorConductor);
        this.MarcadoresConductor.push(MarcadorConductor);
        break;
      case 'En Camino':
        var MarcadorCliente = L.marker(
          [EntregaEntrante.Latitud, EntregaEntrante.Longitud],
          {
            icon: this.IconEnCamino,
          }
        );
        MarcadorCliente.IdEntrega = EntregaEntrante.IdEntrega;
        MarcadorCliente.PedidoNro = EntregaEntrante.PedidoNro;
        MarcadorCliente.Estado = EntregaEntrante.Estado;
        MarcadorCliente.Latitud = EntregaEntrante.Latitud;
        MarcadorCliente.Longitud = EntregaEntrante.Longitud;
        MarcadorCliente.bindPopup(
          (fl) => {
            const DetallePedido: NgElement &
              WithProperties<PopupComponent> = document.createElement(
                'popup-pedido'
              ) as any;
            DetallePedido.addEventListener('closed', () =>
              document.body.removeChild(DetallePedido)
            );
            DetallePedido.data = EntregaEntrante;
            document.body.appendChild(DetallePedido);
            return DetallePedido;
          },
          { maxHeight: 'auto', maxWidth: 'auto' }
        );
        MarcadorCliente.bindTooltip(
          EntregaEntrante.IdEntrega + '<br>' + EntregaEntrante.Nombre
        );
        this.map.addLayer(MarcadorCliente);
        this.MarcadoresCliente.push(MarcadorCliente);
        var MarcadorConductor = L.marker(
          [EntregaEntrante.LatitudReal, EntregaEntrante.LongitudReal],
          {
            icon: this.IconEnCaminoPlan,
          }
        );
        MarcadorConductor.IdEntrega = EntregaEntrante.IdEntrega + '_Conductor';
        MarcadorConductor.PedidoNro = EntregaEntrante.PedidoNro;
        MarcadorConductor.Estado = EntregaEntrante.Estado;
        MarcadorConductor.LatitudReal = EntregaEntrante.LatitudReal;
        MarcadorConductor.LongitudReal = EntregaEntrante.LongitudReal;
        MarcadorConductor.bindPopup(
          (fl) => {
            const DetallePedido: NgElement &
              WithProperties<PopupComponent> = document.createElement(
                'popup-pedido'
              ) as any;
            DetallePedido.addEventListener('closed', () =>
              document.body.removeChild(DetallePedido)
            );
            DetallePedido.data = EntregaEntrante;
            document.body.appendChild(DetallePedido);
            return DetallePedido;
          },
          { maxHeight: 'auto', maxWidth: 'auto' }
        );
        MarcadorConductor.bindTooltip(
          EntregaEntrante.IdEntrega + '<br>' + EntregaEntrante.Nombre
        );
        this.map.addLayer(MarcadorConductor);
        this.MarcadoresConductor.push(MarcadorConductor);
        break;
      case 'En Progreso':
        var MarcadorCliente = L.marker(
          [EntregaEntrante.Latitud, EntregaEntrante.Longitud],
          {
            icon: this.IconEnProgreso,
          }
        );
        MarcadorCliente.IdEntrega = EntregaEntrante.IdEntrega;
        MarcadorCliente.PedidoNro = EntregaEntrante.PedidoNro;
        MarcadorCliente.Estado = EntregaEntrante.Estado;
        MarcadorCliente.Latitud = EntregaEntrante.Latitud;
        MarcadorCliente.Longitud = EntregaEntrante.Longitud;
        MarcadorCliente.bindPopup(
          (fl) => {
            const DetallePedido: NgElement &
              WithProperties<PopupComponent> = document.createElement(
                'popup-pedido'
              ) as any;
            DetallePedido.addEventListener('closed', () =>
              document.body.removeChild(DetallePedido)
            );
            DetallePedido.data = EntregaEntrante;
            document.body.appendChild(DetallePedido);
            return DetallePedido;
          },
          { maxHeight: 'auto', maxWidth: 'auto' }
        );
        MarcadorCliente.bindTooltip(
          EntregaEntrante.IdEntrega + '<br>' + EntregaEntrante.Nombre
        );
        this.map.addLayer(MarcadorCliente);
        this.MarcadoresCliente.push(MarcadorCliente);
        var MarcadorConductor = L.marker(
          [EntregaEntrante.LatitudReal, EntregaEntrante.LongitudReal],
          {
            icon: this.IconEnProgresoPlan,
          }
        );
        MarcadorConductor.IdEntrega = EntregaEntrante.IdEntrega + '_Conductor';
        MarcadorConductor.PedidoNro = EntregaEntrante.PedidoNro;
        MarcadorConductor.Estado = EntregaEntrante.Estado;
        MarcadorConductor.LatitudReal = EntregaEntrante.LatitudReal;
        MarcadorConductor.LongitudReal = EntregaEntrante.LongitudReal;
        MarcadorConductor.bindPopup(
          (fl) => {
            const DetallePedido: NgElement &
              WithProperties<PopupComponent> = document.createElement(
                'popup-pedido'
              ) as any;
            DetallePedido.addEventListener('closed', () =>
              document.body.removeChild(DetallePedido)
            );
            DetallePedido.data = EntregaEntrante;
            document.body.appendChild(DetallePedido);
            return DetallePedido;
          },
          { maxHeight: 'auto', maxWidth: 'auto' }
        );
        MarcadorConductor.bindTooltip(
          EntregaEntrante.IdEntrega + '<br>' + EntregaEntrante.Nombre
        );
        this.map.addLayer(MarcadorConductor);
        this.MarcadoresConductor.push(MarcadorConductor);
        break;
    }
  }
  CargarTareas() {
    this.TareasService.hd_tareas_get_panel_izquierdo().then((data) => {
      this.TareasList = data;
    });
  }

  async CargarEntregas() {
    this.cargadorEntrega = true
    this.map.setView([this.LatitudRegional(this.RegionalSeleccionada), this.LongitudRegional(this.RegionalSeleccionada)]);
    await this.EntregasService.hd_entregas_get(
      this.RegionalSeleccionada,
      this.TiendaSeleccionada,
      this.EstadoSeleccionado,
      this.ConductorSeleccionado,
      this.FechaSeleccionadaInicio,
      this.FechaSeleccionadaFin
    ).then((data) => {
      this.EntregasList = data;
      this.Entregas = new MatTableDataSource(data);
      this.Entregas.paginator = this.paginator;
      this.Entregas.sort = this.sort;
      data.forEach((point) => {
        switch (point.Estado) {
          ////////////////////////////////////////////////////Marcador Nuevo//////////////////////////////////////////////////////
          case 'Nuevo':
            ////////////////////////////////////////////////////Marcador Cliente//////////////////////////////////////////////////////
            var MarcadorCliente = L.marker([point.Latitud, point.Longitud], {
              icon: this.IconNuevo,
            });
            MarcadorCliente.IdEntrega = point.IdEntrega;
            MarcadorCliente.PedidoNro = point.PedidoNro;
            MarcadorCliente.Estado = point.Estado;
            MarcadorCliente.Latitud = point.Latitud;
            MarcadorCliente.Longitud = point.Longitud;
            MarcadorCliente.bindPopup(
              (fl) => {
                const DetallePedido: NgElement &
                  WithProperties<PopupComponent> = document.createElement(
                    'popup-pedido'
                  ) as any;
                DetallePedido.addEventListener('closed', () =>
                  document.body.removeChild(DetallePedido)
                );
                DetallePedido.data = point;
                document.body.appendChild(DetallePedido);
                return DetallePedido;
              },
              { maxHeight: 'auto', maxWidth: 'auto' }
            );
            MarcadorCliente.bindTooltip(
              point.IdEntrega + '<br>' + point.Nombre
            );
            this.map.addLayer(MarcadorCliente);
            this.MarcadoresCliente.push(MarcadorCliente);
            ////////////////////////////////////////////////////Marcador Conductor//////////////////////////////////////////////////////
            var MarcadorConductor = L.marker(
              [point.LatitudReal, point.LongitudReal],
              {
                icon: this.IconNuevoPlan,
              }
            );
            MarcadorConductor.IdEntrega = point.IdEntrega + '_Conductor';
            MarcadorConductor.PedidoNro = point.PedidoNro;
            MarcadorConductor.Estado = point.Estado;
            MarcadorConductor.LatitudReal = point.LatitudReal;
            MarcadorConductor.LongitudReal = point.LongitudReal;
            MarcadorConductor.bindPopup(
              (fl) => {
                const DetallePedido: NgElement &
                  WithProperties<PopupComponent> = document.createElement(
                    'popup-pedido'
                  ) as any;
                DetallePedido.addEventListener('closed', () =>
                  document.body.removeChild(DetallePedido)
                );
                DetallePedido.data = point;
                document.body.appendChild(DetallePedido);
                return DetallePedido;
              },
              { maxHeight: 'auto', maxWidth: 'auto' }
            );
            MarcadorConductor.bindTooltip(
              point.IdEntrega + '<br>' + point.Nombre
            );
            this.map.addLayer(MarcadorConductor);
            this.MarcadoresConductor.push(MarcadorConductor);
            break;
          ////////////////////////////////////////////////////Marcador Cancelado//////////////////////////////////////////////////////
          case 'Cancelado':
            ////////////////////////////////////////////////////Marcador Cliente//////////////////////////////////////////////////////
            var MarcadorCliente = L.marker([point.Latitud, point.Longitud], {
              icon: this.IconCancelado,
            });
            MarcadorCliente.IdEntrega = point.IdEntrega;
            MarcadorCliente.PedidoNro = point.PedidoNro;
            MarcadorCliente.Estado = point.Estado;
            MarcadorCliente.Latitud = point.Latitud;
            MarcadorCliente.Longitud = point.Longitud;
            MarcadorCliente.bindPopup(
              (fl) => {
                const DetallePedido: NgElement &
                  WithProperties<PopupComponent> = document.createElement(
                    'popup-pedido'
                  ) as any;
                DetallePedido.addEventListener('closed', () =>
                  document.body.removeChild(DetallePedido)
                );
                DetallePedido.data = point;
                document.body.appendChild(DetallePedido);
                return DetallePedido;
              },
              { maxHeight: 'auto', maxWidth: 'auto' }
            );
            MarcadorCliente.bindTooltip(
              point.IdEntrega + '<br>' + point.Nombre
            );
            this.map.addLayer(MarcadorCliente);
            this.MarcadoresCliente.push(MarcadorCliente);
            ////////////////////////////////////////////////////Marcador Conductor//////////////////////////////////////////////////////
            var MarcadorConductor = L.marker(
              [point.LatitudReal, point.LongitudReal],
              {
                icon: this.IconCanceladoPlan,
              }
            );
            MarcadorConductor.IdEntrega = point.IdEntrega + '_Conductor';
            MarcadorConductor.PedidoNro = point.PedidoNro;
            MarcadorConductor.Estado = point.Estado;
            MarcadorConductor.LatitudReal = point.LatitudReal;
            MarcadorConductor.LongitudReal = point.LongitudReal;
            MarcadorConductor.bindPopup(
              (fl) => {
                const DetallePedido: NgElement &
                  WithProperties<PopupComponent> = document.createElement(
                    'popup-pedido'
                  ) as any;
                DetallePedido.addEventListener('closed', () =>
                  document.body.removeChild(DetallePedido)
                );
                DetallePedido.data = point;
                document.body.appendChild(DetallePedido);
                return DetallePedido;
              },
              { maxHeight: 'auto', maxWidth: 'auto' }
            );
            MarcadorConductor.bindTooltip(
              point.IdEntrega + '<br>' + point.Nombre
            );
            this.map.addLayer(MarcadorConductor);
            this.MarcadoresConductor.push(MarcadorConductor);
            break;
          ////////////////////////////////////////////////////Marcador Finalizado//////////////////////////////////////////////////////
          case 'Finalizado':
            ////////////////////////////////////////////////////Marcador Cliente//////////////////////////////////////////////////////
            var MarcadorCliente = L.marker([point.Latitud, point.Longitud], {
              icon: this.IconFinalizado,
            });
            MarcadorCliente.IdEntrega = point.IdEntrega;
            MarcadorCliente.PedidoNro = point.PedidoNro;
            MarcadorCliente.Estado = point.Estado;
            MarcadorCliente.Latitud = point.Latitud;
            MarcadorCliente.Longitud = point.Longitud;
            MarcadorCliente.bindPopup(
              (fl) => {
                const DetallePedido: NgElement &
                  WithProperties<PopupComponent> = document.createElement(
                    'popup-pedido'
                  ) as any;
                DetallePedido.addEventListener('closed', () =>
                  document.body.removeChild(DetallePedido)
                );
                DetallePedido.data = point;
                document.body.appendChild(DetallePedido);
                return DetallePedido;
              },
              { maxHeight: 'auto', maxWidth: 'auto' }
            );
            MarcadorCliente.bindTooltip(
              point.IdEntrega + '<br>' + point.Nombre
            );
            this.map.addLayer(MarcadorCliente);
            this.MarcadoresCliente.push(MarcadorCliente);
            ////////////////////////////////////////////////////Marcador Conductor//////////////////////////////////////////////////////
            var MarcadorConductor = L.marker(
              [point.LatitudReal, point.LongitudReal],
              {
                icon: this.IconFinalizadoPlan,
              }
            );
            MarcadorConductor.IdEntrega = point.IdEntrega + '_Conductor';
            MarcadorConductor.PedidoNro = point.PedidoNro;
            MarcadorConductor.Estado = point.Estado;
            MarcadorConductor.LatitudReal = point.LatitudReal;
            MarcadorConductor.LongitudReal = point.LongitudReal;
            MarcadorConductor.bindPopup(
              (fl) => {
                const DetallePedido: NgElement &
                  WithProperties<PopupComponent> = document.createElement(
                    'popup-pedido'
                  ) as any;
                DetallePedido.addEventListener('closed', () =>
                  document.body.removeChild(DetallePedido)
                );
                DetallePedido.data = point;
                document.body.appendChild(DetallePedido);
                return DetallePedido;
              },
              { maxHeight: 'auto', maxWidth: 'auto' }
            );
            MarcadorConductor.bindTooltip(
              point.IdEntrega + '<br>' + point.Nombre
            );
            this.map.addLayer(MarcadorConductor);
            this.MarcadoresConductor.push(MarcadorConductor);
            break;
          ////////////////////////////////////////////////////Marcador En Camino//////////////////////////////////////////////////////
          case 'En Camino':
            ////////////////////////////////////////////////////Marcador Cliente//////////////////////////////////////////////////////
            var MarcadorCliente = L.marker([point.Latitud, point.Longitud], {
              icon: this.IconEnCamino,
            });
            MarcadorCliente.IdEntrega = point.IdEntrega;
            MarcadorCliente.PedidoNro = point.PedidoNro;
            MarcadorCliente.Estado = point.Estado;
            MarcadorCliente.Latitud = point.Latitud;
            MarcadorCliente.Longitud = point.Longitud;
            MarcadorCliente.bindPopup(
              (fl) => {
                const DetallePedido: NgElement &
                  WithProperties<PopupComponent> = document.createElement(
                    'popup-pedido'
                  ) as any;
                DetallePedido.addEventListener('closed', () =>
                  document.body.removeChild(DetallePedido)
                );
                DetallePedido.data = point;
                document.body.appendChild(DetallePedido);
                return DetallePedido;
              },
              { maxHeight: 'auto', maxWidth: 'auto' }
            );
            MarcadorCliente.bindTooltip(
              point.IdEntrega + '<br>' + point.Nombre
            );
            this.map.addLayer(MarcadorCliente);
            this.MarcadoresCliente.push(MarcadorCliente);
            ////////////////////////////////////////////////////Marcador Conductor//////////////////////////////////////////////////////
            var MarcadorConductor = L.marker(
              [point.LatitudReal, point.LongitudReal],
              {
                icon: this.IconEnCaminoPlan,
              }
            );
            MarcadorConductor.IdEntrega = point.IdEntrega + '_Conductor';
            MarcadorConductor.PedidoNro = point.PedidoNro;
            MarcadorConductor.Estado = point.Estado;
            MarcadorConductor.LatitudReal = point.LatitudReal;
            MarcadorConductor.LongitudReal = point.LongitudReal;
            MarcadorConductor.bindPopup(
              (fl) => {
                const DetallePedido: NgElement &
                  WithProperties<PopupComponent> = document.createElement(
                    'popup-pedido'
                  ) as any;
                DetallePedido.addEventListener('closed', () =>
                  document.body.removeChild(DetallePedido)
                );
                DetallePedido.data = point;
                document.body.appendChild(DetallePedido);
                return DetallePedido;
              },
              { maxHeight: 'auto', maxWidth: 'auto' }
            );
            MarcadorConductor.bindTooltip(
              point.IdEntrega + '<br>' + point.Nombre
            );
            this.map.addLayer(MarcadorConductor);
            this.MarcadoresConductor.push(MarcadorConductor);
            break;
          ////////////////////////////////////////////////////Marcador En Progreso//////////////////////////////////////////////////////
          case 'En Progreso':
            ////////////////////////////////////////////////////Marcador Cliente//////////////////////////////////////////////////////
            var MarcadorCliente = L.marker([point.Latitud, point.Longitud], {
              icon: this.IconEnProgreso,
            });
            MarcadorCliente.IdEntrega = point.IdEntrega;
            MarcadorCliente.PedidoNro = point.PedidoNro;
            MarcadorCliente.Estado = point.Estado;
            MarcadorCliente.Latitud = point.Latitud;
            MarcadorCliente.Longitud = point.Longitud;
            MarcadorCliente.bindPopup(
              (fl) => {
                const DetallePedido: NgElement &
                  WithProperties<PopupComponent> = document.createElement(
                    'popup-pedido'
                  ) as any;
                DetallePedido.addEventListener('closed', () =>
                  document.body.removeChild(DetallePedido)
                );
                DetallePedido.data = point;
                document.body.appendChild(DetallePedido);
                return DetallePedido;
              },
              { maxHeight: 'auto', maxWidth: 'auto' }
            );
            MarcadorCliente.bindTooltip(
              point.IdEntrega + '<br>' + point.Nombre
            );
            this.map.addLayer(MarcadorCliente);
            this.MarcadoresCliente.push(MarcadorCliente);
            ////////////////////////////////////////////////////Marcador Conductor//////////////////////////////////////////////////////
            var MarcadorConductor = L.marker(
              [point.LatitudReal, point.LongitudReal],
              {
                icon: this.IconEnProgresoPlan,
              }
            );
            MarcadorConductor.IdEntrega = point.IdEntrega + '_Conductor';
            MarcadorConductor.PedidoNro = point.PedidoNro;
            MarcadorConductor.Estado = point.Estado;
            MarcadorConductor.LatitudReal = point.LatitudReal;
            MarcadorConductor.LongitudReal = point.LongitudReal;
            MarcadorConductor.bindPopup(
              (fl) => {
                const DetallePedido: NgElement &
                  WithProperties<PopupComponent> = document.createElement(
                    'popup-pedido'
                  ) as any;
                DetallePedido.addEventListener('closed', () =>
                  document.body.removeChild(DetallePedido)
                );
                DetallePedido.data = point;
                document.body.appendChild(DetallePedido);
                return DetallePedido;
              },
              { maxHeight: 'auto', maxWidth: 'auto' }
            );
            MarcadorConductor.bindTooltip(
              point.IdEntrega + '<br>' + point.Nombre
            );
            this.map.addLayer(MarcadorConductor);
            this.MarcadoresConductor.push(MarcadorConductor);
            break;
        }
      });
      this.cargadorEntrega = false;
    });
  }
  async CargarConductores() {
    this.cargadorIzquierdo = true
    await this.ConductoresService.hd_conductores_get_panelIzquierdo(this.RegionalSeleccionada).then(
      (data) => {
        this.ConductoresList = data;
        this.cargadorIzquierdo = false
      }
    );
  }
  CargarRegionales() {
    this.CommonsService.regionales_get().then((data) => {
      this.RegionalesList = data;
    });
  }
  CargarTiendas() {
    this.TiendasService.hd_tiendas_get().then((data) => {
      this.TiendasList = data;
    });
  }
  CargarAlmacenes() {
    this.AlmacenesService.hd_almacenes_get().then((data) => {
      this.AlmacenesList = data;
      data.forEach((point) => {
        var MarcadorAlmacen = L.marker([point.Latitud, point.Longitud], {
          icon: this.IconAlmacen,
        });
        MarcadorAlmacen.IdEntrega = point.IdEntrega;
        MarcadorAlmacen.PedidoNro = point.PedidoNro;
        MarcadorAlmacen.Estado = point.Estado;
        MarcadorAlmacen.Latitud = point.Latitud;
        MarcadorAlmacen.Longitud = point.Longitud;
        /*  MarcadorAlmacen.bindPopup(
        (fl) => {
          const DetallePedido: NgElement &
            WithProperties<PopupComponent> = document.createElement(
            'popup-pedido'
          ) as any;
          DetallePedido.addEventListener('closed', () =>
            document.body.removeChild(DetallePedido)
          );
          DetallePedido.data = point;
          document.body.appendChild(DetallePedido);
          return DetallePedido;
        },
        { maxHeight: 'auto', maxWidth: 'auto' }
      ); */
        MarcadorAlmacen.bindTooltip(point.Almacen + '<br>' + point.Responsable);
        this.map.addLayer(MarcadorAlmacen);
        this.MarcadoresAlmacenes.push(MarcadorAlmacen);
      });
    });
  }
  CargarDivisiones() {
    this.CommonsService.divisiones_get().then((data) => {
      this.DivisionesList = data;
    });
  }

  CargarContadorEntregas() {
    this.ContadorEntregas = []
    for (let element of this.ConductoresList) {
      this.EntregasService.hd_entregas_get_count(
        element.CodUsuario, this.FechaSeleccionadaInicio, this.FechaSeleccionadaFin
      ).then((data) => {
        this.ContadorEntregas.push({
          CodUsuario: element.CodUsuario,
          count: data.count
        })
      });
    }

  }

  CargarContadorEntregasFinalizadas() {
    this.ContadorEntregasFinalizadas = []
    for (let element of this.ConductoresList) {
      this.EntregasService.hd_entregas_get_count_finalizadas(
        element.CodUsuario, this.FechaSeleccionadaInicio, this.FechaSeleccionadaFin
      ).then((data) => {
        this.ContadorEntregasFinalizadas.push({
          CodUsuario: element.CodUsuario,
          count: data.count
        })
      });
    }
  }

  MostrarContador(CodUsuario) {
    if (this.ContadorEntregas) {
      for (let element of this.ContadorEntregas) {
        if (element.CodUsuario == CodUsuario) {
          return element.count
        }
      }
    }
  }

  MostrarContadorFinalizadas(CodUsuario) {
    if (this.ContadorEntregasFinalizadas) {
      for (let element of this.ContadorEntregasFinalizadas) {
        if (element.CodUsuario == CodUsuario) {
          return element.count
        }
      }
    }
  }

  EstadoTarea(IdEntrega, TipoTarea) {
    if (this.TareasList) {
      for (let index = 0; index < this.TareasList.length; index++) {
        if (
          this.TareasList[index].IdEntrega == IdEntrega &&
          this.TareasList[index].TipoTarea == TipoTarea
        ) {
          if (this.TareasList[index].Estado == 'Nuevo') {
            return 'badge-secondary';
          } else if (this.TareasList[index].Estado == 'En Progreso') {
            return 'badge-warning';
          } else if (this.TareasList[index].Estado == 'Finalizado') {
            return 'badge-success';
          }
        }
      }
    }
  }
  AsignarEntrega(Entrega) {
    const dialogRef = this.MatDialog.open(AsignarEntregaComponent, {
      width: '60%',
      data: {
        Entrega: Entrega,
        Regional: this.RegionalSeleccionada
      },
    });
  }
  CrearEntrega() {
    const dialogRef = this.MatDialog.open(CreacionEntregaComponent, {
      width: '40%',
    });
  }
  DesAsignarEntrega(Entrega) {
    this.EntregasService.hd_entregas_patch({
      IdEntrega: Entrega.IdEntrega,
      CodUsuario: '',
      Estado: 'Pendiente',
      Almacen: '',
      LatitudAlmacen: '',
      LongituAlmacen: '',
      ResponsableAlmacen: '',
      TelefonoAlmacen: '',
      UsuarioFecha: '',
    }).then((data) => {
      this.TareasService.hd_tareas_get(Entrega.IdEntrega).then((data) => {
        data.forEach((element) => {
          this.TareasService.hd_tareas_delete(element.IdTarea);
        });
      });
      this.EntregasService.hd_EnviarEntregaFirebase_delete({
        IdEntrega: Entrega.IdEntrega,
      }).then((data) => { });
    });
  }

  AbrirConfiguraciones() {
    const dialogRef = this.MatDialog.open(ConfiguracionesComponent, {
      width: '60%',
    });
  }
  Refresh() {
    this.EntregasService.hd_entregas_get(
      this.RegionalSeleccionada,
      this.TiendaSeleccionada,
      this.EstadoSeleccionado,
      this.ConductorSeleccionado,
      this.FechaSeleccionadaInicio,
      this.FechaSeleccionadaFin
    ).then((data) => {
      this.Entregas.data = data;
    });
    this.CargarContadorEntregas()
    this.CargarContadorEntregasFinalizadas()
  }
  RefreshTareas() {
    this.TareasService.hd_tareas_get_panel_izquierdo().then(
      (data) => (this.TareasList = data)
    );
  }
  SeleccionarMarker(IdEntrega) {
    this.MarcadoresCliente.forEach((marcador) => {
      if (marcador.IdEntrega == IdEntrega) {
        this.map.flyTo([Number(marcador.Latitud), Number(marcador.Longitud)], 12);
        marcador.openPopup();
      }
    });
  }
  LimpiarMapa() {
    this.MarcadoresCliente.forEach((marker) => {
      this.map.removeLayer(marker);
    });
    this.MarcadoresCliente = [];
    this.MarcadoresConductor.forEach((marker) => {
      this.map.removeLayer(marker);
    });
    this.MarcadoresConductor = [];
  }

  async SeleccionarRegional(Regional) {
    this.LimpiarMapa();
    await this.CargarEntregas();
    this.CargarContadorEntregas()
    this.CargarContadorEntregasFinalizadas()
    this.CargarConductores();
  }
  async SeleccionarTiendas(Regional) {
    this.LimpiarMapa();
    this.CargarContadorEntregas()
    this.CargarContadorEntregasFinalizadas()
    await this.CargarEntregas();
  }
  SeleccionarDivision(Division) { }
  async SeleccionarEstado(Estado) {
    this.LimpiarMapa();
    await this.CargarEntregas();
    this.CargarContadorEntregas()
    this.CargarContadorEntregasFinalizadas()
  }
  async SeleccionarConductor(Conductor) {
    this.LimpiarMapa();
    await this.CargarEntregas();
    this.CargarContadorEntregas()
    this.CargarContadorEntregasFinalizadas()
  }
  async SeleccionarFecha(Fecha) {
    this.LimpiarMapa();
    this.fileName =
      'Entregas-' +
      moment(this.FechaSeleccionadaInicio).format('YYYY-MM-DD') +
      '-' +
      moment(this.FechaSeleccionadaFin).format('YYYY-MM-DD') +
      '.xlsx';
    await this.CargarEntregas();
    this.CargarContadorEntregas()
    this.CargarContadorEntregasFinalizadas()
  }

  /*  async CargarIndicadoresEntregasFinalizadas(CodUsuario) {
    await this.EntregasService.hd_entregas_get_finalizadas(
      CodUsuario,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFinalizadas = data.count;
    });
    return this.IndicadorFinalizadas;
  } */
  /* 
  async CargarIndicadoresEntregasTotales(CodUsuario) {
    await this.EntregasService.hd_entregas_get_Total(
      CodUsuario,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorTotales = data.count;
    });
    return this.IndicadorTotales;
  } */

  CargarMetodoPagos() {
    this.MetodoPagosService.hd_metodopagos_get().then((data) => {
      this.metodopagosList = data;
    });
  }

  MetodoPagoApp(MetodoPago) {
    if (this.metodopagosList != undefined) {
      for (let i = 0; i < this.metodopagosList.length; i++) {
        if (this.metodopagosList[i].MetodoPagoMagento == MetodoPago) {
          return this.metodopagosList[i].MetodoPago;
        }
      }
    }
  }

  AlmacenEntrega(CodAlmacen) {
    if (this.AlmacenesList != undefined) {
      for (let element of this.AlmacenesList) {
        if (element.CodAlmacen == CodAlmacen) {
          return element.Almacen;
        }
      }
    }
  }

  exportexcel(): void {
    this.cargandoDescarga = true;
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
    this.cargandoDescarga = false;
  }
  LatitudRegional(Regional) {
    for (let element of this.RegionalesList) {
      if (element.Regional == Regional) {
        return element.Latitud
      }
    }
  }
  LongitudRegional(Regional) {
    for (let element of this.RegionalesList) {
      if (element.Regional == Regional) {
        return element.Longitud
      }
    }
  }
  applyFilter(filterValue: string) {
    this.Entregas.filter = filterValue.trim().toLowerCase();
    if (this.Entregas.paginator) {
      this.Entregas.paginator.firstPage();
    }
  }

  async ngOnInit() {

    this.SocketioService.setupSocketConnection();

    this.fileName =
      'Entregas-' +
      moment(this.FechaSeleccionadaInicio).format('YYYY-MM-DD') +
      '-' +
      moment(this.FechaSeleccionadaFin).format('YYYY-MM-DD') +
      '.xlsx';
    this.CargarRegionales();
    await this.CargarConductores();
    await this.CargarEntregas();
    this.CargarMetodoPagos();
    this.CargarContadorEntregas()
    this.CargarContadorEntregasFinalizadas()

    this.CargarTareas();
    this.CargarTiendas();
    this.CargarAlmacenes();
  }
  ngAfterViewInit(): void {
    L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
    var Satelital = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    ),
      Cartográfico = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
        maxNativeZoom: 19, // OSM max available zoom is at 19.
        maxZoom: 21, // Match the map maxZoom, or leave map.options.maxZoom undefined.
      });

    this.map = L.map('VistaMapa', {
      center: [-16.4897, -68.1193],
      zoom: 12,
      gestureHandling: true,
      maxNativeZoom: 18,
    });
    L.control
      .layers(
        {
          Satelital: Satelital,
          Cartográfico: Cartográfico,
        },
        null,
        {
          collapsed: true,
        }
      )
      .addTo(this.map);
    Cartográfico.addTo(this.map);
  }
}
