import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressResumePage } from './address-resume.page';

describe('AddressResumePage', () => {
  let component: AddressResumePage;
  let fixture: ComponentFixture<AddressResumePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressResumePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressResumePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
