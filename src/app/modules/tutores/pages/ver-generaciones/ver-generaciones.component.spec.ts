import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGeneracionesComponent } from './ver-generaciones.component';

describe('VerGeneracionesComponent', () => {
  let component: VerGeneracionesComponent;
  let fixture: ComponentFixture<VerGeneracionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerGeneracionesComponent]
    });
    fixture = TestBed.createComponent(VerGeneracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
