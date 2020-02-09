import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableOpenObjectComponent } from './editable-open-object.component';

describe('EditableOpenObjectComponent', () => {
  let component: EditableOpenObjectComponent;
  let fixture: ComponentFixture<EditableOpenObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableOpenObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableOpenObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
