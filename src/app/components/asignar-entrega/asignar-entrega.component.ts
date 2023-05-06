import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConductoresService } from 'src/app/services/conductores.service';
import { AlmacenesService } from 'src/app/services/almacenes.service';
import { MetodoPagosService } from 'src/app/services/metodo-pagos.service';
import { CrearConductorComponent } from '../crear-conductor/crear-conductor.component';
import 'leaflet';
import 'leaflet.markercluster';
import '../../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import {
  GeoSearchControl,
  GoogleProvider,
  OpenStreetMapProvider,
} from 'leaflet-geosearch';
import { EntregasService } from 'src/app/services/entregas.service';
import { TareasService } from 'src/app/services/tareas.service';
import * as moment from 'moment';
import { v1 as uuidv1 } from 'uuid';

declare let L;

@Component({
  selector: 'app-asignar-entrega',
  templateUrl: './asignar-entrega.component.html',
  styleUrls: ['./asignar-entrega.component.css'],
})
export class AsignarEntregaComponent implements OnInit {
  map: any;
  loading = false;
  ConductoresList: any;
  AlmacenesList: any;
  metodopagosList: any;

  CodUsuario: any;
  IdEntrega: any;
  OrderId: any;
  Nombre: any;
  IdCliente: any;
  NitCi: any;
  Conductor: any;
  Direccion: any;
  Telefono: any;
  Latitud: any = 0;
  Longitud: any = 0;
  Almacen: any;
  Zona: any;
  Descripcion: any;
  NroPedido: any;
  NroFactura: any;
  FacturaAIO: any;
  Nota: any;
  MetodoPago: any;
  Monto: any;
  Moneda: any;
  IdTarea01: any;
  IdTarea02: any;
  LatitudAlmacen: any;
  LongitudAlmacen: any;
  ResponsableAlmacen: any;
  TelefonoAlmacen: any;
  KUNNR: any;
  RegionalSeleccionada: any;

  Icon = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#28a745;' class='marker-pin'></div><i class='material-icons'>home</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });

  constructor(
    public dialogRef: MatDialogRef<AsignarEntregaComponent>,
    private ConductoresService: ConductoresService,
    private AlmacenesService: AlmacenesService,
    private EntregasService: EntregasService,
    private MetodoPagosService: MetodoPagosService,
    private TareasService: TareasService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.RegionalSeleccionada = this.data.Regional
    this.IdEntrega = this.data.Entrega.IdEntrega;
    this.OrderId = this.data.Entrega.OrderId;
    this.Nombre = this.data.Entrega.Nombre;
    this.IdCliente = this.data.Entrega.IdCliente;
    this.Telefono = this.data.Entrega.Telefono;
    this.Zona = this.data.Entrega.Zona;
    this.Direccion = this.data.Entrega.Direccion;
    this.MetodoPago = this.data.Entrega.MetodoPago;
    this.Monto = this.data.Entrega.Monto;
    this.Moneda = this.data.Entrega.Moneda;
    this.NitCi = this.data.Entrega.NitCi;
    this.NroPedido = this.data.Entrega.NroPedido;
    this.Almacen = this.data.Entrega.Almacen;
  }
  CargarConductores() {
    this.ConductoresService.hd_conductores_get_panelIzquierdo(this.RegionalSeleccionada).then((data) => {
      this.ConductoresList = data;
    });
  }
  CargarAlmacenes() {
    this.AlmacenesService.hd_almacenes_get().then((data) => {
      this.AlmacenesList = data;
    });
  }
  async AsignarConductor() {
    this.loading = true;
    if (this.MetodoPagosCobranza(this.MetodoPago)) {
      this.IdTarea01 = uuidv1();
      this.IdTarea02 = uuidv1();
      this.IdCliente = uuidv1();
      await this.TareasService.hd_tareas_post({
        IdTarea: this.IdTarea01,
        Estado: 'Nuevo',
        FechaInicioReal: '1900-01-01T00:00:00.000Z',
        FechaFinReal: '1900-01-01T00:00:00.000Z',
        IdEntrega: this.IdEntrega,
        TipoTarea: '01',
      }).then((data) => {
        console.log('Entrega Creada');
      });
      await this.TareasService.hd_tareas_post({
        IdTarea: this.IdTarea02,
        Estado: 'Nuevo',
        FechaInicioReal: '1900-01-01T00:00:00.000Z',
        FechaFinReal: '1900-01-01T00:00:00.000Z',
        IdEntrega: this.IdEntrega,
        TipoTarea: '02',
        Monto: this.Monto,
        Moneda: this.Moneda,
      }).then((data) => {
        console.log('Cobranza Creada');
      });
      await this.EntregasService.hd_entregas_patch({
        IdEntrega: this.IdEntrega,
        CodUsuario: this.CodUsuario,
        Estado: 'Nuevo',
        FechaRecojoAlmacen: '1900-01-01 00:00:00',
        FechaEntregaCliente: '1900-01-01 00:00:00',
        FechaEntrega: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        LatitudReal: 0,
        LongitudReal: 0,
        Observacion: '',
        UsuarioFecha:
          this.CodUsuario +
          '_' +
          moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        NroFactura: this.NroFactura,
        FacturaAIO: this.FacturaAIO,
        NroPedido: this.NroPedido,
        MetodoPago: this.MetodoPago,
        Monto: this.Monto,
        Moneda: this.Moneda,
        IdCliente: this.IdCliente,
        Latitud: this.Latitud,
        Longitud: this.Longitud,
        NitCi: this.NitCi,
        Nombre: this.Nombre,
        Telefono: this.Telefono,
        Almacen: this.Almacen,
        Descripcion: this.Descripcion,
        Nota: this.Nota,
        LatitudAlmacen: this.LatitudAlmacen,
        LongituAlmacen: this.LongitudAlmacen,
        ResponsableAlmacen: this.ResponsableAlmacen,
        TelefonoAlmacen: this.TelefonoAlmacen,
        KUNNR: this.KUNNR,
      }).then((data) => {
        console.log('Entrega creada en Base de datos');
      });
      await this.EntregasService.hd_EnviarEntregaFirebase_put({
        CodUsuario: this.CodUsuario,
        DatosCliente: {
          Direccion: this.Direccion + ' ' + this.Zona,
          FacturaAIO: this.FacturaAIO,
          IdCliente: this.IdCliente,
          IdEntrega: this.IdEntrega,
          OrderId: this.OrderId,
          Latitud: this.Latitud.toString(),
          Longitud: this.Longitud.toString(),
          MetodoPago: this.MetodoPagoApp(this.MetodoPago),
          Moneda: this.Moneda,
          Monto: this.Monto.toString(),
          NitCi: this.NitCi,
          Nombre: this.Nombre,
          NroFactura: this.NroFactura,
          Telefono: this.Telefono,
          KUNNR: this.KUNNR,
        },
        Estado: 'Nuevo',
        FechaRecojoAlmacen: '1900-01-01 00:00:00',
        FechaEntregaCliente: '1900-01-01 00:00:00',
        FechaEntrega: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        IdEntrega: this.IdEntrega,
        LatitudReal: '0',
        LongitudReal: '0',
        Observacion: '',
        UsuarioFecha:
          this.CodUsuario + '_' + moment(new Date()).format('YYYY-MM-DD'),
        Descripcion: this.Descripcion,
        Nota: this.Nota,
        LatitudAlmacen: this.LatitudAlmacen,
        LongituAlmacen: this.LongitudAlmacen,
        ResponsableAlmacen: this.ResponsableAlmacen,
        TelefonoAlmacen: this.TelefonoAlmacen,
      }).then((data) => {
        console.log('Entrega creada en Firebase');
      });
      await this.TareasService.hd_EnviarTareaFirebase_put({
        IdTarea: this.IdTarea01,
        Estado: 'Nuevo',
        FechaInicioReal: '1900-01-01 00:00:00',
        FechaFinReal: '1900-01-01 00:00:00',
        IdEntrega: this.IdEntrega,
        TipoTarea: '01',
        Monto: this.Monto.toString(),
        Moneda: this.Moneda,
      }).then((data) => {
        console.log('Entrega Creada');
      });
      await this.TareasService.hd_EnviarTareaFirebase_put({
        IdTarea: this.IdTarea02,
        Estado: 'Nuevo',
        FechaInicioReal: '1900-01-01 00:00:00',
        FechaFinReal: '1900-01-01 00:00:00',
        IdEntrega: this.IdEntrega,
        TipoTarea: '02',
        Monto: this.Monto.toString(),
        Moneda: this.Moneda,
      }).then((data) => {
        console.log('Cobranza Creada');
      });
      this.dialogRef.close();
      this.loading = false;
      ///////////////////////////////////////////////////////////////////////////////////
    } else {
      this.IdTarea01 = uuidv1();
      this.IdCliente = uuidv1();
      await this.TareasService.hd_tareas_post({
        IdTarea: this.IdTarea01,
        Estado: 'Nuevo',
        FechaInicioReal: '1900-01-01T00:00:00.000Z',
        FechaFinReal: '1900-01-01T00:00:00.000Z',
        IdEntrega: this.IdEntrega,
        TipoTarea: '01',
      }).then((data) => {
        console.log('Entrega Creada');
      });

      await this.EntregasService.hd_entregas_patch({
        IdEntrega: this.IdEntrega,
        CodUsuario: this.CodUsuario,
        Estado: 'Nuevo',
        FechaRecojoAlmacen: '1900-01-01 00:00:00',
        FechaEntregaCliente: '1900-01-01 00:00:00',
        FechaEntrega: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        LatitudReal: 0,
        LongitudReal: 0,
        Observacion: '',
        UsuarioFecha:
          this.CodUsuario +
          '_' +
          moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        NroFactura: this.NroFactura,
        FacturaAIO: this.FacturaAIO,
        NroPedido: this.NroPedido,
        MetodoPago: this.MetodoPago,
        Monto: this.Monto,
        Moneda: this.Moneda,
        IdCliente: this.IdCliente,
        Latitud: this.Latitud,
        Longitud: this.Longitud,
        NitCi: this.NitCi,
        Nombre: this.Nombre,
        Telefono: this.Telefono,
        Almacen: this.Almacen,
        Descripcion: this.Descripcion,
        Nota: this.Nota,
        LatitudAlmacen: this.LatitudAlmacen,
        LongituAlmacen: this.LongitudAlmacen,
        ResponsableAlmacen: this.ResponsableAlmacen,
        TelefonoAlmacen: this.TelefonoAlmacen,
        KUNNR: this.KUNNR,
      }).then((data) => {
        console.log('Entrega creada en Base de datos');
      });
      await this.EntregasService.hd_EnviarEntregaFirebase_put({
        CodUsuario: this.CodUsuario,
        DatosCliente: {
          Direccion: this.Direccion + ' ' + this.Zona,
          FacturaAIO: this.FacturaAIO,
          IdCliente: this.IdCliente,
          IdEntrega: this.IdEntrega,
          OrderId: this.OrderId,
          Latitud: this.Latitud.toString(),
          Longitud: this.Longitud.toString(),
          MetodoPago: this.MetodoPagoApp(this.MetodoPago),
          Moneda: this.Moneda,
          Monto: this.Monto.toString(),
          NitCi: this.NitCi,
          Nombre: this.Nombre,
          NroFactura: this.NroFactura,
          Telefono: this.Telefono,
          KUNNR: this.KUNNR,
        },
        Estado: 'Nuevo',
        FechaRecojoAlmacen: '1900-01-01 00:00:00',
        FechaEntregaCliente: '1900-01-01 00:00:00',
        FechaEntrega: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        IdEntrega: this.IdEntrega,
        LatitudReal: '0',
        LongitudReal: '0',
        Observacion: '',
        UsuarioFecha:
          this.CodUsuario + '_' + moment(new Date()).format('YYYY-MM-DD'),
        Descripcion: this.Descripcion,
        Nota: this.Nota,
        LatitudAlmacen: this.LatitudAlmacen,
        LongituAlmacen: this.LongitudAlmacen,
        ResponsableAlmacen: this.ResponsableAlmacen,
        TelefonoAlmacen: this.TelefonoAlmacen,
      }).then((data) => {
        console.log('Entrega creada en Firebase');
      });
      await this.TareasService.hd_EnviarTareaFirebase_put({
        IdTarea: this.IdTarea01,
        Estado: 'Nuevo',
        FechaInicioReal: '1900-01-01 00:00:00',
        FechaFinReal: '1900-01-01 00:00:00',
        IdEntrega: this.IdEntrega,
        TipoTarea: '01',
        Monto: this.Monto.toString(),
        Moneda: this.Moneda,
      }).then((data) => {
        console.log('Entrega Creada');
      });

      this.loading = false;
      this.dialogRef.close();
      ///////////////////////////////////////////////////////////////////////////////////
    }
  }
  CargarMetodoPagos() {
    this.MetodoPagosService.hd_metodopagos_get().then((data) => {

      this.metodopagosList = data;
    });
  }

  SeleccionarAlmacen(Almacen) {
    this.AlmacenDatos(this.Almacen);
  }

  MetodoPagosCobranza(MetodoPago) {
    if (this.metodopagosList != undefined) {
      for (let element of this.metodopagosList) {
        if (
          element.MetodoPagoMagento == MetodoPago &&
          element.TipoTarea == '02'
        ) {
          return true;
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
  AlmacenDatos(CodAlmacen) {
    if (this.AlmacenesList != undefined) {
      for (let element of this.AlmacenesList) {
        if (element.CodAlmacen == CodAlmacen) {
          this.LatitudAlmacen = element.Latitud;
          this.LongitudAlmacen = element.Longitud;
          this.ResponsableAlmacen = element.Responsable;
          this.TelefonoAlmacen = element.Telefono;
        }
      }
    }
  }

  MetodoPagoApp(MetodoPago) {
    if (this.metodopagosList != undefined) {
      for (let i = 0; i < this.metodopagosList.length; i++) {
        if (this.metodopagosList[i].MetodoPagoMagento == MetodoPago) {
          this.MetodoPago = this.metodopagosList[i].MetodoPago;
          return this.metodopagosList[i].MetodoPago;
        }
      }
    }
  }
  ngOnInit(): void {
    this.CargarConductores();
    this.CargarAlmacenes();
    this.CargarMetodoPagos();
  }

  ngAfterViewInit(): void {
    const provider = new GoogleProvider({
      params: {
        key: 'AIzaSyAVxcWBmaOEX-74OGCINpyrUn2E9oLE3HY',
      },
    });
    const searchControl = GeoSearchControl({
      provider: provider,
      showMarker: true,
      showPopup: false,
      marker: {
        icon: this.Icon,
        draggable: true,
      },
    });

    var Satelital = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    ),
      Cartográfico = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
        maxNativeZoom: 19,
        maxZoom: 21,
      });
    this.map = L.map('VistaMapa', {
      center: [-17.414, -66.1653],
      zoom: 7,
      gestureHandling: true,
      maxNativeZoom: 18,
    });
    this.map.addControl(searchControl);
    this.map.on('geosearch/showlocation', (result) => {
      console.log(result);
      
      this.Latitud = result.marker._latlng.lat;
      this.Longitud = result.marker._latlng.lng;

      result.marker.on('dragend', (event) => {
        this.Latitud = event.target._latlng.lat;
        this.Longitud = event.target._latlng.lng;
      });
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
  onNoClick(): void {
    this.dialogRef.close();
  }
}
