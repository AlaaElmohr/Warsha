import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandinateStartComponent } from './candinate-start.component';

describe('CandinateStartComponent', () => {
  let component: CandinateStartComponent;
  let fixture: ComponentFixture<CandinateStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandinateStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandinateStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
