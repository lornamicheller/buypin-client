import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentPage } from './edit-payment.page';

describe('EditPaymentPage', () => {
  let component: EditPaymentPage;
  let fixture: ComponentFixture<EditPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
