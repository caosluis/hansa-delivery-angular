import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaVisitaComponent } from './tarjeta-visita.component';

describe('TarjetaVisitaComponent', () => {
  let component: TarjetaVisitaComponent;
  let fixture: ComponentFixture<TarjetaVisitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
