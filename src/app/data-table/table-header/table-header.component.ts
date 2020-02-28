import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


class HeaderOptions {
  close?: boolean;
}

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Input() options: Promise<HeaderOptions>;
  @Output() insert = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  resolvedOptions: HeaderOptions = {};

  defaultOptions: HeaderOptions = {
    close: false,
  };

  constructor() { }

  ngOnInit() {
    this.options.then(options => {
      this.resolvedOptions = Object.assign({}, this.defaultOptions, options);
    });
  }
}
