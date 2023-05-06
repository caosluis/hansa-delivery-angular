import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MetodoPagosService } from 'src/app/services/metodo-pagos.service';
import { CrearMetodoComponent } from './crear-metodo/crear-metodo.component';

@Component({
  selector: 'app-metodo-pagos',
  templateUrl: './metodo-pagos.component.html',
  styleUrls: ['./metodo-pagos.component.css'],
})
export class MetodoPagosComponent implements OnInit {
  Cobranza = [
    { Codigo: '01', Etiqueta: 'Sin Cobranza' },
    { Codigo: '02', Etiqueta: 'Con Cobranza' },
  ];
  ConductoresColumns: string[] = ['TipoTarea', 'MetodoPago', 'Actions'];

  Metodos: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public MatDialog: MatDialog,
    private MetodoPagosService: MetodoPagosService
  ) {}

  CargarMetodos() {
    this.MetodoPagosService.hd_metodopagos_get().then((data) => {
      this.Metodos = new MatTableDataSource(data);
      this.Metodos.paginator = this.paginator;
      this.Metodos.sort = this.sort;
    });
  }
  CrearMetodo(Metodo) {
    const dialogRef = this.MatDialog.open(CrearMetodoComponent, {
      width: '60%',
      data: Metodo,
    });
  }

  Etiqueta(Codigo) {
    if (this.Cobranza != undefined) {
      for (let i = 0; i < this.Cobranza.length; i++) {
        if (this.Cobranza[i].Codigo == Codigo) {
          if (this.Cobranza[i]) {
            return this.Cobranza[i].Etiqueta;
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.CargarMetodos();
  }
}
