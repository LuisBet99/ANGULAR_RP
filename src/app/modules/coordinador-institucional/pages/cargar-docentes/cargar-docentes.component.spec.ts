import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarDocentesComponent } from './cargar-docentes.component';

describe('CargarDocentesComponent', () => {
  let component: CargarDocentesComponent;
  let fixture: ComponentFixture<CargarDocentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarDocentesComponent]
    });
    fixture = TestBed.createComponent(CargarDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
