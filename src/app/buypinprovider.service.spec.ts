import { TestBed } from '@angular/core/testing';

import { BuypinproviderService } from './buypinprovider.service';

describe('BuypinproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuypinproviderService = TestBed.get(BuypinproviderService);
    expect(service).toBeTruthy();
  });
});
