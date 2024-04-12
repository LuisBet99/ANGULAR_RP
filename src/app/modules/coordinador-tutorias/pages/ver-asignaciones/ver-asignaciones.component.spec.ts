import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAsignacionesComponent } from './ver-asignaciones.component';

describe('VerAsignacionesComponent', () => {
  let component: VerAsignacionesComponent;
  let fixture: ComponentFixture<VerAsignacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerAsignacionesComponent]
    });
    fixture = TestBed.createComponent(VerAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
