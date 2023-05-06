import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaDetalleComponent } from './entrega-detalle.component';

describe('EntregaDetalleComponent', () => {
  let component: EntregaDetalleComponent;
  let fixture: ComponentFixture<EntregaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
