import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentJobComponent } from './payment-job.component';

describe('PaymentJobComponent', () => {
  let component: PaymentJobComponent;
  let fixture: ComponentFixture<PaymentJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
