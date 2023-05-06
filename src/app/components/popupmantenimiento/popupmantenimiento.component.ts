import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { InventariosService } from 'src/app/services/inventarios.service';
import { GlobalConstants } from '../../../assets/common/global-constants';


@Component({
  selector: 'app-popupmantenimiento',
  templateUrl: './popupmantenimiento.component.html',
  styleUrls: ['./popupmantenimiento.component.css'],
})
export class PopupmantenimientoComponent implements OnInit {
  url = GlobalConstants.Crm;
  @Input() data;
  /*   images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`); */
  closeResult: any = '';
  TareasPorVisitas: any;
  FotosPorVisitas: any;
  fecha_inicio_no_iniciado = '1899-01-01 00:00:00';
  fecha_final_no_iniciado = '1899-01-01 00:00:00';
  ImagenDocumento: any;

  displayedColumns: string[] = ['NombreItem', 'Usado'];
  InventarioInstalacionList: MatTableDataSource<any>;
  InventarioCuadrillaList: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private InventariosService: InventariosService,
    private modalService: NgbModal
  ) { }

  greeting = {};
  name = 'World';

  @ViewChild('p') public popover: NgbPopover;

  /* public open(): void {
    const isOpen = this.popover.isOpen();
    this.popover.close();
    setTimeout(() => {
      this.popover.open();
    }, 350);
  }

  public close(): void {
    this.popover.close();
  }

  CargarTareasPorVisitas() {
    this.CoordenadasService.CargarTareasPorVisitas(this.data.VisitaID).then(
      (tarea) => {
        this.TareasPorVisitas = tarea;
      }
    );
  }

  CargarFotosPorVisitas() {
    this.CoordenadasService.CargarFotosPorVisitas(this.data.VisitaID).then(
      (foto) => {
        this.FotosPorVisitas = foto;
      }
    );
  }

  CargarImagenDocumento(foto) {
    this.ImagenDocumento = foto;
  }

  open1(content1) {
    this.modalService
      .open(content1, { size: 'lg', ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } */

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    /*  this.CargarTareasPorVisitas();
     this.CargarFotosPorVisitas();
     this.CargarInventarioCuadrilla(); */
  }

  /*  CargarInventarioCuadrilla() {
     this.InventariosService.hanin_inventarioscuadrilla_get().then((data) => {
       this.InventarioCuadrillaList = new MatTableDataSource(data);
       this.InventarioCuadrillaList.paginator = this.paginator;
       this.InventarioCuadrillaList.sort = this.sort;
     });
   } */
}
