import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarAlumnosComponent } from './cargar-alumnos.component';

describe('CargarAlumnosComponent', () => {
  let component: CargarAlumnosComponent;
  let fixture: ComponentFixture<CargarAlumnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarAlumnosComponent]
    });
    fixture = TestBed.createComponent(CargarAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
