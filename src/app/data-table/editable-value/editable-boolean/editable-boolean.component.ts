import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editable-boolean',
  templateUrl: './editable-boolean.component.html',
  styleUrls: ['./editable-boolean.component.scss']
})
export class EditableBooleanComponent implements OnInit {

  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  open = false;
  valueControl = new FormControl();
  formGroup = new FormGroup({ checkBoxControl: this.valueControl });

  constructor() { }

  ngOnInit() {

  }

  @Input() set value(value: boolean) {
    this.valueControl.setValue(value);
  }

  get value() {
    return this.valueControl.value;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.open && event.key === 'Enter') {
      this.save.emit(this.valueControl.value);
    }
    if (this.open && event.key === 'Escape') {
      this.cancel.emit();
    }
  }

}
