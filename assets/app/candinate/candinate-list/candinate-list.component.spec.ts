import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandinateListComponent } from './candinate-list.component';

describe('CandinateListComponent', () => {
  let component: CandinateListComponent;
  let fixture: ComponentFixture<CandinateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandinateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandinateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
