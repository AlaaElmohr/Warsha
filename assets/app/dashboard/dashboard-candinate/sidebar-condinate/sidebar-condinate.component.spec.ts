import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCondinateComponent } from './sidebar-condinate.component';

describe('SidebarCondinateComponent', () => {
  let component: SidebarCondinateComponent;
  let fixture: ComponentFixture<SidebarCondinateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCondinateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCondinateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
