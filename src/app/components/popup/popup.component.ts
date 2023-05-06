import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { TareasService } from 'src/app/services/tareas.service';
import { FotosService } from 'src/app/services/fotos.service';
import { GlobalConstants } from '../../../assets/common/global-constants';
import { DomSanitizer } from '@angular/platform-browser';
import { AlmacenesService } from 'src/app/services/almacenes.service';
import { state, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('90', style({ transform: 'rotate(90deg)' })),
      state('180', style({ transform: 'rotate(180deg)' })),
      state('270', style({ transform: 'rotate(270deg)' })),
    ])
  ]
})
export class PopupComponent implements OnInit {
  state: string = 'default';
  url = GlobalConstants.Crm;
  @Input() data;
  /*   images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`); */
  closeResult = '';
  TareasList: any;
  AlmacenesList: any;
  Fotos: any;
  ImagenDocumento: any;
  PedidoNro: any;
  Estado: any;
  CodUsuario: any;
  Direccion: any;
  Almacen: any;
  Nombre: any;
  FechaEntrega: any;
  IdEntrega: any;
  FotoFirma: any;
  FotoRespaldo: any;
  constructor(
    private TareasService: TareasService,
    private FotosService: FotosService,
    private DomSanitizer: DomSanitizer,
    private AlmacenesService: AlmacenesService
  ) { }

  @ViewChild('p') public popover: NgbPopover;

  CargarAlmacenes() {
    this.AlmacenesService.hd_almacenes_get().then((data) => {
      this.AlmacenesList = data;
    });
  }
  CargarTareas() {
    this.TareasService.hd_tareas_get(this.IdEntrega).then((data) => {
      this.TareasList = data;
    });
  }
  CargarFotos() {
    this.FotosService.hd_fotos_get_Firma(this.IdEntrega, 'Firma').then(
      (data) => {
        this.FotoFirma = this.DomSanitizer.bypassSecurityTrustResourceUrl(
          'data:image/png;base64,' + data[0].Foto.Foto
        );
      }
    );
    this.FotosService.hd_fotos_get_Respaldo(this.IdEntrega, 'Respaldo').then(
      (data) => {
        this.FotoRespaldo = this.DomSanitizer.bypassSecurityTrustResourceUrl(
          'data:image/png;base64,' + data[0].Foto.Foto
        );
      }
    );
    /* data.forEach((element) => {
        this.imageSource = this.DomSanitizer.bypassSecurityTrustResourceUrl(
          'data:image/png;base64,' + element.Foto.Foto
        );
      });
      this.Fotos = data; */
  }
  EstadoTarea(IdEntrega, TipoTarea) {
    if (this.TareasList) {
      for (let index = 0; index < this.TareasList.length; index++) {
        if (
          this.TareasList[index].IdEntrega == IdEntrega &&
          this.TareasList[index].TipoTarea == TipoTarea
        ) {
          if (this.TareasList[index].Estado == 'Nuevo') {
            return 'badge-secondary';
          } else if (this.TareasList[index].Estado == 'En Progreso') {
            return 'badge-warning';
          } else if (this.TareasList[index].Estado == 'Finalizado') {
            return 'badge-success';
          }
        }
      }
    }
  }
  FechaTarea(IdEntrega, TipoTarea, InicioFin) {
    if (InicioFin == 'Inicio') {
      if (this.TareasList) {
        for (let index = 0; index < this.TareasList.length; index++) {
          if (
            this.TareasList[index].IdEntrega == IdEntrega &&
            this.TareasList[index].TipoTarea == TipoTarea
          ) {
            return this.TareasList[index].FechaInicioReal;
          }
        }
      }
    } else if (InicioFin == 'Fin') {
      if (this.TareasList) {
        for (let index = 0; index < this.TareasList.length; index++) {
          if (
            this.TareasList[index].IdEntrega == IdEntrega &&
            this.TareasList[index].TipoTarea == TipoTarea
          ) {
            return this.TareasList[index].FechaFinReal;
          }
        }
      }
    }
  }
  ObservacionTarea(IdEntrega, TipoTarea) {
    if (this.TareasList) {
      for (let index = 0; index < this.TareasList.length; index++) {
        if (
          this.TareasList[index].IdEntrega == IdEntrega &&
          this.TareasList[index].TipoTarea == TipoTarea
        ) {
          return this.TareasList[index].Observacion;
        }
      }
    }
  }
  AlmacenDatos(CodAlmacen) {
    if (this.AlmacenesList != undefined) {
      for (let i = 0; i < this.AlmacenesList.length; i++) {
        if (this.AlmacenesList[i].CodAlmacen == CodAlmacen) {
          return this.AlmacenesList[i].Almacen;
        }
      }
    }
  }
  rotate() {
    if (this.state == 'default') {
      this.state = '90'
    } else if (this.state == '90') {
      this.state = '180'
    } else if (this.state == '180') {
      this.state = '270'
    } else if (this.state == '270') {
      this.state = 'default'
    }
  }
  ngOnInit(): void {
    this.IdEntrega = this.data.IdEntrega;
    this.Estado = this.data.Estado;
    this.CodUsuario = this.data.CodUsuario;
    this.Direccion = this.data.Direccion;
    this.Nombre = this.data.Nombre;
    this.Almacen = this.data.Almacen;
    this.FechaEntrega = this.data.FechaEntrega;
  }

  ngAfterViewInit(): void {
    this.CargarTareas();
    this.CargarAlmacenes();
    this.CargarFotos();
    /*   this.CargarTareasPorVisitas();
    this.CargarFotosPorVisitas(); */
  }
}
