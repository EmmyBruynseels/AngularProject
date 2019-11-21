import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPollsComponent } from './edit-polls.component';

describe('EditPollsComponent', () => {
  let component: EditPollsComponent;
  let fixture: ComponentFixture<EditPollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
