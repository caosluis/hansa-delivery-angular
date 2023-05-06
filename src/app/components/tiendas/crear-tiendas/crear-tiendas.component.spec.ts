import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTiendasComponent } from './crear-tiendas.component';

describe('CrearTiendasComponent', () => {
  let component: CrearTiendasComponent;
  let fixture: ComponentFixture<CrearTiendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTiendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
