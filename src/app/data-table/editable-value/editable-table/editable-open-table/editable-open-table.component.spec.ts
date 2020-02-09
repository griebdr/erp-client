import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableOpenTableComponent } from './editable-open-table.component';

describe('EditableOpenTableComponent', () => {
  let component: EditableOpenTableComponent;
  let fixture: ComponentFixture<EditableOpenTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableOpenTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableOpenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
