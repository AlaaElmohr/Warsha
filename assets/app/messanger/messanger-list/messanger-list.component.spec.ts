import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessangerListComponent } from './messanger-list.component';

describe('MessangerListComponent', () => {
  let component: MessangerListComponent;
  let fixture: ComponentFixture<MessangerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessangerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessangerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
