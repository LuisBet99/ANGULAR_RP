import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSemestralComponent } from './reporte-semestral.component';

describe('ReporteSemestralComponent', () => {
  let component: ReporteSemestralComponent;
  let fixture: ComponentFixture<ReporteSemestralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteSemestralComponent]
    });
    fixture = TestBed.createComponent(ReporteSemestralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
