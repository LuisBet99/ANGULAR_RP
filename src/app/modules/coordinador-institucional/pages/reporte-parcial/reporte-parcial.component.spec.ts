import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteParcialComponent } from './reporte-parcial.component';

describe('ReporteParcialComponent', () => {
  let component: ReporteParcialComponent;
  let fixture: ComponentFixture<ReporteParcialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteParcialComponent]
    });
    fixture = TestBed.createComponent(ReporteParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
