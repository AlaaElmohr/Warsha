import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavberMobileComponent } from './navber-mobile.component';

describe('NavberMobileComponent', () => {
  let component: NavberMobileComponent;
  let fixture: ComponentFixture<NavberMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavberMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavberMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
