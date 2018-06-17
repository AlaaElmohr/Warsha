import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonePostComponent } from './done-post.component';

describe('DonePostComponent', () => {
  let component: DonePostComponent;
  let fixture: ComponentFixture<DonePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
