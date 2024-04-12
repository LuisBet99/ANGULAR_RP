import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorespruebaComponent } from './profesoresprueba.component';

describe('ProfesorespruebaComponent', () => {
  let component: ProfesorespruebaComponent;
  let fixture: ComponentFixture<ProfesorespruebaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesorespruebaComponent]
    });
    fixture = TestBed.createComponent(ProfesorespruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
