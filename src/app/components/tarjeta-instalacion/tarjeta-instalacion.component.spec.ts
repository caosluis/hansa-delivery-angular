import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaInstalacionComponent } from './tarjeta-instalacion.component';

describe('TarjetaInstalacionComponent', () => {
  let component: TarjetaInstalacionComponent;
  let fixture: ComponentFixture<TarjetaInstalacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaInstalacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
