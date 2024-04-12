import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCarrerasComponent } from './cargar-carreras.component';

describe('CargarCarrerasComponent', () => {
  let component: CargarCarrerasComponent;
  let fixture: ComponentFixture<CargarCarrerasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarCarrerasComponent]
    });
    fixture = TestBed.createComponent(CargarCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
