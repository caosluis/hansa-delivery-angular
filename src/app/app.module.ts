import '@angular/compiler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, LOCALE_ID } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsComponent } from './components/components.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MapaComponent } from './components/mapa/mapa.component';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './components/popup/popup.component';
import { PopupmantenimientoComponent } from './components/popupmantenimiento/popupmantenimiento.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GlobalConstants } from '../assets/common/global-constants';
import { TarjetaVisitaComponent } from './components/tarjeta-visita/tarjeta-visita.component';
import { TarjetaInstalacionComponent } from './components/tarjeta-instalacion/tarjeta-instalacion.component';
import { AppRoutingModule } from './app-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import ESP from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { InventariosComponent } from './components/inventarios/inventarios.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { NroserieComponent } from './components/inventarios/nroserie/nroserie.component';
import { TrasladosComponent } from './components/traslados/traslados.component';
import { AsignarEntregaComponent } from './components/asignar-entrega/asignar-entrega.component';
import { CrearConductorComponent } from './components/crear-conductor/crear-conductor.component';
import { ConductoresComponent } from './components/conductores/conductores.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';
import { MetodoPagosComponent } from './components/metodo-pagos/metodo-pagos.component';
import { EntregaDetalleComponent } from './components/entrega-detalle/entrega-detalle.component';
import { AlmacenComponent } from './components/almacen/almacen.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearAlmacenComponent } from './components/almacen/crear-almacen/crear-almacen.component';
import { LogsComponent } from './components/logs/logs.component';
import { ErroresEnvioMagentoComponent } from './components/Logs/errores-envio-magento/errores-envio-magento.component';
import { CrearMetodoComponent } from './components/metodo-pagos/crear-metodo/crear-metodo.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { CrearTiendasComponent } from './components/tiendas/crear-tiendas/crear-tiendas.component';
import { DepositosComponent } from './components/depositos/depositos.component';
import { DetalleDepositosComponent } from './components/depositos/detalle-depositos/detalle-depositos.component';
import { SocketioService } from './services/socketio.service';
import { CreacionEntregaComponent } from './components/creacion-entrega/creacion-entrega.component';
import { MatSortModule } from '@angular/material/sort';
registerLocaleData(ESP, 'es');

const config: SocketIoConfig = {
  url: GlobalConstants.Socket + ':' + GlobalConstants.SocketPort,
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    MapaComponent,
    PopupComponent,
    PopupmantenimientoComponent,
    TarjetaVisitaComponent,
    TarjetaInstalacionComponent,
    InventariosComponent,
    SolicitudComponent,
    NroserieComponent,
    TrasladosComponent,
    AsignarEntregaComponent,
    CrearConductorComponent,
    ConductoresComponent,
    ConfiguracionesComponent,
    MetodoPagosComponent,
    EntregaDetalleComponent,
    AlmacenComponent,
    UsuariosComponent,
    CrearAlmacenComponent,
    LogsComponent,
    ErroresEnvioMagentoComponent,
    CrearMetodoComponent,
    TiendasComponent,
    CrearTiendasComponent,
    DepositosComponent,
    DetalleDepositosComponent,
    CreacionEntregaComponent,
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    SocketIoModule.forRoot(config),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatBadgeModule,
    MatGridListModule,
    MatCheckboxModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatTreeModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    [NgbPaginationModule, NgbAlertModule],
    AppRoutingModule,
  ],
  /* providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }], */
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent, PopupmantenimientoComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const PopupElement = createCustomElement(PopupComponent, { injector });
    customElements.define('popup-pedido', PopupElement);
    const PopupMantenimiento = createCustomElement(
      PopupmantenimientoComponent,
      { injector }
    );
    customElements.define('popup-mantenimiento', PopupMantenimiento);
  }
}
