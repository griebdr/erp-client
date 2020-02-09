import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableNumberComponent } from './editable-number.component';

describe('EditableNumberComponent', () => {
  let component: EditableNumberComponent;
  let fixture: ComponentFixture<EditableNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
