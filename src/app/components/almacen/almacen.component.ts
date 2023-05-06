import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlmacenesService } from 'src/app/services/almacenes.service';
import { CrearAlmacenComponent } from './crear-almacen/crear-almacen.component';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css'],
})
export class AlmacenComponent implements OnInit {
  AlmacenesColumns: string[] = [
    'CodAlmacen',
    'Almacen',
    'Latitud',
    'Longitud',
    'Actions',
  ];
  Almacenes: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public MatDialog: MatDialog,
    private AlmacenesService: AlmacenesService
  ) {}
  CargarAlmacenes() {
    this.AlmacenesService.hd_almacenes_get().then((data) => {
      this.Almacenes = new MatTableDataSource(data);
      this.Almacenes.paginator = this.paginator;
      this.Almacenes.sort = this.sort;
    });
  }
  CrearAlmacen() {
    const dialogRef = this.MatDialog.open(CrearAlmacenComponent, {
      width: '60%',
    });
  }
  ngOnInit(): void {
    this.CargarAlmacenes();
  }
}
