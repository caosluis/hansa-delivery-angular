import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { DepositosService } from 'src/app/services/depositos.service';

@Component({
  selector: 'app-detalle-depositos',
  templateUrl: './detalle-depositos.component.html',
  styleUrls: ['./detalle-depositos.component.css'],
})
export class DetalleDepositosComponent implements OnInit {
  loading = false;
  procesado: any;
  Foto: any;
  DetalleDepositosColumns: string[] = ['Cliente', 'Monto', 'NroFactura'];
  DetalleDepositos: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public MatDialogRef: MatDialogRef<DetalleDepositosComponent>,
    private DomSanitizer: DomSanitizer,
    private DepositosService: DepositosService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.procesado = this.data.Procesado;
  }

  Procesado() {
    this.loading = true;
    this.DepositosService.hd_depositos_patch(this.data.IdDeposito, {
      Procesado: 'Si',
    }).then((data) => {
      this.procesado = 'Si';
      this.loading = false;
    });
  }
  ngOnInit(): void {    
    this.Foto = this.DomSanitizer.bypassSecurityTrustResourceUrl(
      'data:image/png;base64,' + this.data.Foto.Foto
    );
    this.DepositosService.hd_DetalleDepositos_get(this.data.IdDeposito).then(
      (data) => {
        this.DetalleDepositos = new MatTableDataSource(data);
        this.DetalleDepositos.paginator = this.paginator;
        this.DetalleDepositos.sort = this.sort;
      }
    );
  }
  onNoClick(): void {
    this.MatDialogRef.close();
  }
}
