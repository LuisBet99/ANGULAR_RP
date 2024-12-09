import { TestBed } from '@angular/core/testing';

import { ReporteParcialService } from './reporte-parcial.service';

describe('ReporteParcialService', () => {
  let service: ReporteParcialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteParcialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
