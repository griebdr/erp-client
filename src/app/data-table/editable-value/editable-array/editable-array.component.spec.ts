import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableArrayComponent } from './editable-array.component';

describe('EditableArrayComponent', () => {
  let component: EditableArrayComponent;
  let fixture: ComponentFixture<EditableArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
