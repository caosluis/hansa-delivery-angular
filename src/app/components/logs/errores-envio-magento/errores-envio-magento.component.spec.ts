import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroresEnvioMagentoComponent } from './errores-envio-magento.component';

describe('ErroresEnvioMagentoComponent', () => {
  let component: ErroresEnvioMagentoComponent;
  let fixture: ComponentFixture<ErroresEnvioMagentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroresEnvioMagentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroresEnvioMagentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
