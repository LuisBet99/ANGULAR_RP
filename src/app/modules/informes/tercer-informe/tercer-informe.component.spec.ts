import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TercerInformeComponent } from './tercer-informe.component';

describe('TercerInformeComponent', () => {
  let component: TercerInformeComponent;
  let fixture: ComponentFixture<TercerInformeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TercerInformeComponent]
    });
    fixture = TestBed.createComponent(TercerInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
