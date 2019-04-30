import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskByUserComponent } from './view-task-by-user.component';

describe('ViewTaskByUserComponent', () => {
  let component: ViewTaskByUserComponent;
  let fixture: ComponentFixture<ViewTaskByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
