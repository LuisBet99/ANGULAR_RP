import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarTutoresComponent } from './cargar-tutores.component';

describe('CargarTutoresComponent', () => {
  let component: CargarTutoresComponent;
  let fixture: ComponentFixture<CargarTutoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarTutoresComponent]
    });
    fixture = TestBed.createComponent(CargarTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
