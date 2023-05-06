import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetodoPagosService } from 'src/app/services/metodo-pagos.service';
import { v1 as uuidv1 } from 'uuid';

@Component({
  selector: 'app-crear-metodo',
  templateUrl: './crear-metodo.component.html',
  styleUrls: ['./crear-metodo.component.css'],
})
export class CrearMetodoComponent implements OnInit {
  loading = false;
  IDMetodoPago: any;
  TipoTarea: any;
  MetodoPago: any;
  constructor(
    public dialogRef: MatDialogRef<CrearMetodoComponent>,
    private MetodoPagosService: MetodoPagosService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async CrearAlmacen() {
    this.loading = true;
    if (this.data != 'Nuevo') {
      this.IDMetodoPago = uuidv1();
      await this.MetodoPagosService.hd_metodopagos_post({
        IDMetodoPago: this.IDMetodoPago,
        TipoTarea: this.TipoTarea,
        MetodoPago: this.MetodoPago,
      }).then((data) => {
        this.loading = false;
        this.dialogRef.close();
      });
    } else {
      await this.MetodoPagosService.hd_metodopagos_patch(this.IDMetodoPago, {
        TipoTarea: this.TipoTarea,
        MetodoPago: this.MetodoPago,
      }).then((data) => {
        this.loading = false;
        this.dialogRef.close();
      });
    }
  }

  ngOnInit(): void {
    if (this.data != 'Nuevo') {
      this.IDMetodoPago = this.data.IDMetodoPago;
      this.TipoTarea = this.data.TipoTarea;
      this.MetodoPago = this.data.MetodoPago;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
