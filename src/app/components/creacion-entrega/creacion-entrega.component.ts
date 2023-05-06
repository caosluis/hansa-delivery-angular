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
import { CommonsService } from 'src/app/services/commons.service';
import * as moment from 'moment';
import { v1 as uuidv1 } from 'uuid';

declare let L;

@Component({
  selector: 'app-creacion-entrega',
  templateUrl: './creacion-entrega.component.html',
  styleUrls: ['./creacion-entrega.component.css']
})
export class CreacionEntregaComponent implements OnInit {

  map: any;
  loading = false;
  ConductoresList: any;
  AlmacenesList: any;
  metodopagosList: any;
  zonaList: any;
  monedaList: any;

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

  Icon = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#28a745;' class='marker-pin'></div><i class='material-icons'>home</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });

  constructor(
    public dialogRef: MatDialogRef<CreacionEntregaComponent>,
    private AlmacenesService: AlmacenesService,
    private EntregasService: EntregasService,
    private MetodoPagosService: MetodoPagosService,
    private CommonsService: CommonsService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any) {

  }

  CargarAlmacenes() {
    this.AlmacenesService.hd_almacenes_get().then((data) => {
      this.AlmacenesList = data;
    });
  }
  CrearEntrega() {
    this.loading = true
    this.EntregasService.hd_entregas_get_last().then(data => {
      console.log(data);

      if (data.length > 0) {
        this.OrderId = parseInt(data[0].OrderId) + 1
      } else {
        this.OrderId = 1
      }
      this.EntregasService.hd_entregas_post({
        MetodoPago: this.MetodoPago,
        Monto: this.Monto,
        Moneda: this.Moneda,
        Direccion: this.Direccion,
        Zona: this.Zona,
        OrderId: this.OrderId,
        IdEntrega: 'W-' + this.NumeroPad(this.OrderId),
        NroPedido: 'W-' + this.NumeroPad(this.OrderId),
        NitCi: this.NitCi,
        Nombre: this.Nombre,
        Telefono: this.Telefono,
        Tienda: "Pedidos"
      }).then(data => {
        this.loading = false
        this.dialogRef.close();
      })
    })

  }

  CargarMetodoPagos() {
    this.MetodoPagosService.hd_metodopagos_get().then((data) => {

      this.metodopagosList = data;
    });
  }
  CargarZonas() {
    this.CommonsService.zona_get().then((data) => {
      this.zonaList = data;
    });
  }
  CargarMonedas() {
    this.CommonsService.moneda_get().then((data) => {
      this.monedaList = data;
    });
  }

  SeleccionarAlmacen(Almacen) {
    this.AlmacenDatos(this.Almacen);
  }

  MetodoPagosCobranza(MetodoPago) {
    if (this.metodopagosList != undefined) {
      for (let i = 0; i < this.metodopagosList.length; i++) {
        if (
          this.metodopagosList[i].MetodoPago == MetodoPago &&
          this.metodopagosList[i].TipoTarea == '02'
        ) {
          return true;
        }
      }
    }
  }

  AlmacenEntrega(CodAlmacen) {
    if (this.AlmacenesList != undefined) {
      for (let i = 0; i < this.AlmacenesList.length; i++) {
        if (this.AlmacenesList[i].CodAlmacen == CodAlmacen) {
          return this.AlmacenesList[i].Almacen;
        }
      }
    }
  }
  AlmacenDatos(CodAlmacen) {
    if (this.AlmacenesList != undefined) {
      for (let i = 0; i < this.AlmacenesList.length; i++) {
        if (this.AlmacenesList[i].CodAlmacen == CodAlmacen) {
          this.LatitudAlmacen = this.AlmacenesList[i].Latitud;
          this.LongitudAlmacen = this.AlmacenesList[i].Longitud;
          this.ResponsableAlmacen = this.AlmacenesList[i].Responsable;
          this.TelefonoAlmacen = this.AlmacenesList[i].Telefono;
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

  NumeroPad(Numero) {
    return Numero.toString().padStart(10, "0");
  }
  ngOnInit(): void {
    this.CargarAlmacenes();
    this.CargarMetodoPagos();
    this.CargarZonas();
    this.CargarMonedas();
  }

  ngAfterViewInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
