import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerInformeComponent } from './primer-informe.component';

describe('PrimerInformeComponent', () => {
  let component: PrimerInformeComponent;
  let fixture: ComponentFixture<PrimerInformeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimerInformeComponent]
    });
    fixture = TestBed.createComponent(PrimerInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
