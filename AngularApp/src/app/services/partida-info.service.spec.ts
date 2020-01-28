import { TestBed } from '@angular/core/testing';

import { PartidaInfoService } from './partida-info.service';

describe('PartidaInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartidaInfoService = TestBed.get(PartidaInfoService);
    expect(service).toBeTruthy();
  });
});
