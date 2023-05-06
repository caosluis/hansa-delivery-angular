import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConductoresService } from 'src/app/services/conductores.service';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { TiendasService } from 'src/app/services/tiendas.service';
import { CommonsService } from 'src/app/services/commons.service';
import { UserpasswordService } from '../../services/userpassword.service';

@Component({
  selector: 'app-crear-conductor',
  templateUrl: './crear-conductor.component.html',
  styleUrls: ['./crear-conductor.component.css'],
})
export class CrearConductorComponent implements OnInit {
  regionalesList: any;
  TiendasList: any;
  tipovehiculoList: any;

  hide = true;

  Estado: any = 'Activo';
  Nombre: any;
  CodUsuario: any;
  Password: any;
  Tienda: any;
  IdRegional: any;
  Regional: any;
  Organizacion: any;
  IdVendedor: any;
  CI: any;
  Placa: any;
  Telefono: any;
  TipoVehiculo: any;
  Capacidad: any;
  Descripcion: any;

  constructor(
    public dialogRef: MatDialogRef<CrearConductorComponent>,
    private ConductoresService: ConductoresService,
    private TiendasService: TiendasService,
    private CommonsService: CommonsService,
    private UserpasswordService: UserpasswordService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  CargarRegionales() {
    this.CommonsService.regionales_get().then(
      (data) => (this.regionalesList = data)
    );
  }
  CargarTiendas() {
    this.TiendasService.hd_tiendas_get().then((data) => {
      this.TiendasList = data;
    });
  }

  CargarTipoVehiculos() {
    this.CommonsService.tipovehiculo_get().then((data) => {
      this.tipovehiculoList = data;
    });
  }
  SeleccionarRegional(Regional) {
    for (let i = 0; i < this.regionalesList.length; i++) {
      if (this.regionalesList[i].Regional == Regional) {
        this.IdRegional = this.regionalesList[i].IdRegional;
      }
    }
  }
  SeleccionarTipoVehiculo(TipoVehiculo) { }

  async RegistrarConductor() {
    this.ConductoresService.hd_conductores_post({
      Estado: this.Estado,
      Nombre: this.Nombre,
      CodUsuario: this.CodUsuario.toUpperCase(),
      Tienda: this.Tienda,
      IdRegional: this.IdRegional,
      Regional: this.Regional,
      Organizacion: this.Organizacion,
      //IdVendedor: this.IdVendedor,
      CI: this.CI,
      Placa: this.Placa,
      Descripcion: this.Descripcion,
      Telefono: this.Telefono,
      Capacidad: this.Capacidad,
      TipoVehiculo: this.TipoVehiculo,
      username: this.CodUsuario,
      password: this.Password,
    }).then((data) => { });
    this.UserpasswordService.hd_userpasswords_post({
      Username: this.CodUsuario.toUpperCase(),
      Password: this.Password,
    }).then((data) => { });
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.CargarRegionales();
    this.CargarTiendas();
    this.CargarTipoVehiculos();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
