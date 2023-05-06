import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlmacenComponent } from './crear-almacen.component';

describe('CrearAlmacenComponent', () => {
  let component: CrearAlmacenComponent;
  let fixture: ComponentFixture<CrearAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAlmacenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
