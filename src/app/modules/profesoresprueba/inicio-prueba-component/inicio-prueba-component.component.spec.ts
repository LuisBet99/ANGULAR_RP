import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPruebaComponentComponent } from './inicio-prueba-component.component';

describe('InicioPruebaComponentComponent', () => {
  let component: InicioPruebaComponentComponent;
  let fixture: ComponentFixture<InicioPruebaComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioPruebaComponentComponent]
    });
    fixture = TestBed.createComponent(InicioPruebaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
