import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupmantenimientoComponent } from './popupmantenimiento.component';

describe('PopupmantenimientoComponent', () => {
  let component: PopupmantenimientoComponent;
  let fixture: ComponentFixture<PopupmantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupmantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupmantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
