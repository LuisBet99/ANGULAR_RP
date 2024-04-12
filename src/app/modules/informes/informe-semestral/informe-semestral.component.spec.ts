import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeSemestralComponent } from './informe-semestral.component';

describe('InformeSemestralComponent', () => {
  let component: InformeSemestralComponent;
  let fixture: ComponentFixture<InformeSemestralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformeSemestralComponent]
    });
    fixture = TestBed.createComponent(InformeSemestralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
