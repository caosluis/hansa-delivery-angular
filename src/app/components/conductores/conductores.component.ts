import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConductoresService } from 'src/app/services/conductores.service';
import { AsignarEntregaComponent } from '../asignar-entrega/asignar-entrega.component';
import { CrearConductorComponent } from '../crear-conductor/crear-conductor.component';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css'],
})
export class ConductoresComponent implements OnInit {
  ConductoresColumns: string[] = [
    'Nombre',
    'CI',
    'Placa',
    'Telefono',
    'Capacidad',
    'Descripcion',
    'Estado',
    'Actions',
  ];
  Conductores: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public MatDialog: MatDialog,
    private ConductoresService: ConductoresService,
    private Socket: Socket
  ) {
    this.Socket.on('Conductor_Ingresa_Modificado', (point) => {
      this.Refresh();
    });
  }

  CrearConductor(Conductor) {
    const dialogRef = this.MatDialog.open(CrearConductorComponent, {
      width: '30%',
      data: Conductor,
    });
  }

  CargarConductores() {
    this.ConductoresService.hd_conductores_get().then((data) => {
      this.Conductores = new MatTableDataSource(data);
      this.Conductores.paginator = this.paginator;
      this.Conductores.sort = this.sort;
    });
  }
  AsignarEntrega(Conductor) {
    const dialogRef = this.MatDialog.open(AsignarEntregaComponent, {
      width: '60%',
      data: Conductor,
    });
  }
  ActivarDesactivarConductor(Conductor) {
    if (Conductor.Estado == 'Activo') {
      this.ConductoresService.hd_conductores_patch(Conductor.id, {
        Estado: 'Inactivo',
      });
    } else if (Conductor.Estado == 'Inactivo') {
      this.ConductoresService.hd_conductores_patch(Conductor.id, {
        Estado: 'Activo',
      });
    }
  }
  Refresh() {
    this.ConductoresService.hd_conductores_get().then((data) => {
      this.Conductores.data = data;
    });
  }
  ngOnInit(): void {
    this.CargarConductores();
  }
}
