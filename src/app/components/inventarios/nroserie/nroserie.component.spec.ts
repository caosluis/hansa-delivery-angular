import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NroserieComponent } from './nroserie.component';

describe('NroserieComponent', () => {
  let component: NroserieComponent;
  let fixture: ComponentFixture<NroserieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NroserieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NroserieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
