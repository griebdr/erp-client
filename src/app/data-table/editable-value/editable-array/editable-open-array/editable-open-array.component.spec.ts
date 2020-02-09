import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableOpenArrayComponent } from './editable-open-array.component';

describe('EditableOpenArrayComponent', () => {
  let component: EditableOpenArrayComponent;
  let fixture: ComponentFixture<EditableOpenArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableOpenArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableOpenArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
