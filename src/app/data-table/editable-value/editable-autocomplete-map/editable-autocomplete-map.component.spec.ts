import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableAutocompleteMapComponent } from './editable-autocomplete-map.component';

describe('EditableAutocompleteMapComponent', () => {
  let component: EditableAutocompleteMapComponent;
  let fixture: ComponentFixture<EditableAutocompleteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableAutocompleteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableAutocompleteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
