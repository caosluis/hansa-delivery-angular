import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TiendasService } from 'src/app/services/tiendas.service';
import { CrearTiendasComponent } from './crear-tiendas/crear-tiendas.component';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
})
export class TiendasComponent implements OnInit {
  TiendasColumns: string[] = [
    'CodTienda',
    'Tienda',
    'Latitud',
    'Longitud',
    'Actions',
  ];
  Tiendas: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public MatDialog: MatDialog,
    private TiendasService: TiendasService
  ) {}
  CargarTiendas() {
    this.TiendasService.hd_tiendas_get().then((data) => {
      this.Tiendas = new MatTableDataSource(data);
      this.Tiendas.paginator = this.paginator;
      this.Tiendas.sort = this.sort;
    });
  }
  CrearTiendas() {
    const dialogRef = this.MatDialog.open(CrearTiendasComponent, {
      width: '60%',
    });
  }
  ngOnInit(): void {
    this.CargarTiendas();
  }
}
