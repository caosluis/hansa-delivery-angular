import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import 'leaflet';
import {
  GeoSearchControl,
  GoogleProvider,
  OpenStreetMapProvider,
} from 'leaflet-geosearch';
import { AlmacenesService } from 'src/app/services/almacenes.service';
import { v1 as uuidv1 } from 'uuid';

declare let L;

@Component({
  selector: 'app-crear-almacen',
  templateUrl: './crear-almacen.component.html',
  styleUrls: ['./crear-almacen.component.css'],
})
export class CrearAlmacenComponent implements OnInit {
  map: any;
  loading = false;
  CodAlmacen: any;
  Almacen: any;
  Latitud: any = 0;
  Longitud: any = 0;
  Responsable: any;
  Email: any
  Telefono: any
  Icon = L.divIcon({
    className: 'custom-div-icon',
    html:
      "<div style='background-color:#28a745;' class='marker-pin'></div><i class='material-icons'>home</i>",
    iconSize: [30, 35],
    popupAnchor: [1, -15],
  });
  constructor(
    public dialogRef: MatDialogRef<CrearAlmacenComponent>,
    private AlmacenesService: AlmacenesService
  ) { }

  async CrearAlmacen() {
    this.loading = true;
    this.CodAlmacen = uuidv1();
    await this.AlmacenesService.hd_almacenes_post({
      CodAlmacen: this.CodAlmacen,
      Almacen: this.Almacen,
      Latitud: this.Latitud,
      Longitud: this.Longitud,
    }).then((data) => {
      this.loading = false;
      this.dialogRef.close();
    });
  }

  ngOnInit(): void {
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
    this.map = L.map('AlmacenMapa', {
      center: [-17.414, -66.1653],
      zoom: 7,
      gestureHandling: true,
      maxNativeZoom: 18,
    });
    this.map.addControl(searchControl);
    this.map.on('geosearch/showlocation', (result) => {
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
