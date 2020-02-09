import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableObjectComponent } from './editable-object.component';

describe('EditableObjectComponent', () => {
  let component: EditableObjectComponent;
  let fixture: ComponentFixture<EditableObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
