import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableValueComponent } from './editable-value.component';

describe('EditableValueComponent', () => {
  let component: EditableValueComponent;
  let fixture: ComponentFixture<EditableValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
