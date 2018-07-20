import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessangerRoomComponent } from './messanger-room.component';

describe('MessangerRoomComponent', () => {
  let component: MessangerRoomComponent;
  let fixture: ComponentFixture<MessangerRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessangerRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessangerRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
