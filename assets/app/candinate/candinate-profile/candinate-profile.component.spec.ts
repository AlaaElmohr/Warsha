import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandinateProfileComponent } from './candinate-profile.component';

describe('CandinateProfileComponent', () => {
  let component: CandinateProfileComponent;
  let fixture: ComponentFixture<CandinateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandinateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandinateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
