import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResporteMensualComponent } from './resporte-mensual.component';

describe('ResporteMensualComponent', () => {
  let component: ResporteMensualComponent;
  let fixture: ComponentFixture<ResporteMensualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResporteMensualComponent]
    });
    fixture = TestBed.createComponent(ResporteMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
