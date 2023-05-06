import { Component, OnInit, ViewChild } from '@angular/core';
import { DepositosService } from 'src/app/services/depositos.service';
import { Socket } from 'ngx-socket-io';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetalleDepositosComponent } from './detalle-depositos/detalle-depositos.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.css'],
})
export class DepositosComponent implements OnInit {
  fileName: any;
  cargandoDescarga = false;
  DepositosColumns: string[] = [
    'Banco',
    'Fecha',
    'FechaRegistro',
    'CodUsuario',
    'DesEntrega',
    'Moneda',
    'Monto',
    'Depositante',
    'NroDocumento',
    'Obs',
    'Regional',
    'Procesado',
    'Actions',
  ];
  Depositos: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public MatDialog: MatDialog,
    private DepositosService: DepositosService,
    private Socket: Socket
  ) {
    this.Socket.on('Deposito_Entrante', (point) => {
      this.Refresh();
    });
  }

  CargarDepositos() {
    this.DepositosService.hd_depositos_get().then((data) => {
      this.Depositos = new MatTableDataSource(data);
      this.Depositos.paginator = this.paginator;
      this.Depositos.sort = this.sort;
    });
  }
  Detalle(Deposito) {
    const dialogRef = this.MatDialog.open(DetalleDepositosComponent, {
      width: '60%',
      data: Deposito,
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.Refresh();
    });
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

  Refresh() {
    this.DepositosService.hd_depositos_get().then((data) => {
      this.Depositos.data = data;
    });
  }
  ngOnInit(): void {
    this.fileName = 'Depositos.xlsx';
    this.CargarDepositos();
  }
}
