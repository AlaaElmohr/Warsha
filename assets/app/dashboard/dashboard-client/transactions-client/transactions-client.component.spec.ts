import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsClientComponent } from './transactions-client.component';

describe('TransactionsClientComponent', () => {
  let component: TransactionsClientComponent;
  let fixture: ComponentFixture<TransactionsClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
