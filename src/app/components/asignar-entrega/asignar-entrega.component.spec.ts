import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarEntregaComponent } from './asignar-entrega.component';

describe('AsignarEntregaComponent', () => {
  let component: AsignarEntregaComponent;
  let fixture: ComponentFixture<AsignarEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
