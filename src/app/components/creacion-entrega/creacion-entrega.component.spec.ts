import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionEntregaComponent } from './creacion-entrega.component';

describe('CreacionEntregaComponent', () => {
  let component: CreacionEntregaComponent;
  let fixture: ComponentFixture<CreacionEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
