import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileClientComponent } from './edit-profile-client.component';

describe('EditProfileClientComponent', () => {
  let component: EditProfileClientComponent;
  let fixture: ComponentFixture<EditProfileClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
