import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoPagosComponent } from './metodo-pagos.component';

describe('MetodoPagosComponent', () => {
  let component: MetodoPagosComponent;
  let fixture: ComponentFixture<MetodoPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodoPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
