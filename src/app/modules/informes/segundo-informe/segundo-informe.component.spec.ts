import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoInformeComponent } from './segundo-informe.component';

describe('SegundoInformeComponent', () => {
  let component: SegundoInformeComponent;
  let fixture: ComponentFixture<SegundoInformeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SegundoInformeComponent]
    });
    fixture = TestBed.createComponent(SegundoInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
