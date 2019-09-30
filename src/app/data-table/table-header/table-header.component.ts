import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TableFeatures } from '../data-table/data-table.component';


class Features {
  insert?: boolean;
  delete?: boolean;
  filter?: boolean;
  close?: boolean;
}

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Input() features: Features;
  @Output() insert = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();

  defaultFeatures: TableFeatures = {
    insert: true,
    delete: true,
    filter: true,
    close: false,
    save: false,
  }

  constructor() { }

  ngOnInit() {
    this.features = Object.assign({}, this.defaultFeatures, this.features);
  }
}
